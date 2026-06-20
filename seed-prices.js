const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchAndSave(symbol) {
  try {
    const res = await fetch(`https://dps.psx.com.pk/timeseries/eod/${symbol}`)
    const json = await res.json()

    if (json.status !== 1 || !json.data || json.data.length === 0) {
      return { symbol, status: 'no-data' }
    }

    // Only keep last 200 trading days per stock to save space
    const rows = json.data.slice(0, 200).map(row => {
      const [timestamp, close, volume, open] = row
      const date = new Date(timestamp * 1000).toISOString().split('T')[0]
      return {
        ticker: symbol,
        date,
        open,
        close,
        volume,
      }
    })

    const { error } = await supabase
      .from('stock_prices')
      .upsert(rows, { onConflict: 'ticker,date' })

    if (error) {
      console.log('FULL ERROR MESSAGE:', error.message)
      console.log('FULL ERROR CODE:', error.code)
      console.log('FULL ERROR DETAILS:', error.details)
      console.log('FULL ERROR HINT:', error.hint)
      return { symbol, status: 'db-error', error: error.message }
    }
    return { symbol, status: 'ok', count: rows.length }
  } catch (e) {
    return { symbol, status: 'fetch-error', error: e.message }
  }
}

async function main() {
  const { data: companies, error } = await supabase
    .from('psx_companies')
    .select('symbol')
    .eq('is_etf', false)

  if (error) {
    console.error('Failed to load company list:', error.message)
    return
  }

  console.log(`Backfilling price history for ${companies.length} stocks...`)
  console.log('This will take a while — grab a coffee ☕')

  let success = 0, failed = 0

  for (let i = 0; i < companies.length; i++) {
    const symbol = companies[i].symbol
    const result = await fetchAndSave(symbol)

    if (result.status === 'ok') {
      success++
      console.log(`[${i + 1}/${companies.length}] ✅ ${symbol} — ${result.count} rows`)
    } else {
      failed++
      console.log(`[${i + 1}/${companies.length}] ❌ ${symbol} — ${result.status}`)
    }

    // Small delay to be polite to PSX servers
    await sleep(300)
  }

  console.log(`\n🎉 Done! Success: ${success}, Failed: ${failed}`)
}

main()