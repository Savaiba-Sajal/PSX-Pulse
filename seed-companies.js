const fs = require('fs')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function main() {
  const raw = fs.readFileSync('./symbols.json', 'utf-8')
  const all = JSON.parse(raw)

  const equity = all.filter(s => !s.isDebt && s.sectorName && s.sectorName !== 'BILLS AND BONDS')

  console.log(`Found ${equity.length} equity symbols. Seeding company list...`)

  const batchSize = 200
  for (let i = 0; i < equity.length; i += batchSize) {
    const batch = equity.slice(i, i + batchSize).map(s => ({
      symbol: s.symbol,
      name: s.name,
      sector: s.sectorName,
      is_etf: s.isETF || false,
    }))

    const { error } = await supabase
      .from('psx_companies')
      .upsert(batch, { onConflict: 'symbol' })

    if (error) {
      console.error(`Batch ${i} failed:`, error.message)
    } else {
      console.log(`✅ Inserted batch ${i / batchSize + 1} (${batch.length} companies)`)
    }
  }

  console.log('🎉 Company list seeding complete!')
}

main()