const TICKERS = [
  'MARI', 'OGDC', 'PPL', 'POL',           // Oil & Gas
  'HBL', 'UBL', 'MCB', 'BAFL', 'BOP',     // Banking
  'ENGRO', 'FFC', 'FATIMA',               // Fertilizer
  'LUCK', 'DGKC', 'MLCF',                 // Cement
  'PSO', 'SHEL', 'APL',                   // Oil Marketing
  'TRG', 'SYS',                           // Tech
  'NESTLE', 'COLG',                       // Consumer
]
export async function GET() {
  try {
    const results = await Promise.all(
      TICKERS.map(async (symbol) => {
        try {
          const res = await fetch(`https://dps.psx.com.pk/timeseries/eod/${symbol}`)
          const json = await res.json()
          if (json.status !== 1 || !json.data || json.data.length < 2) return null

          // data[0] = most recent, data[1] = previous day (PSX returns newest first)
          const [, latestClose, , latestOpen] = json.data[0]
          const [, prevClose] = json.data[1]

          const change = latestClose - prevClose
          const pct = (change / prevClose) * 100

          return {
            ticker: symbol,
            price: latestClose,
            change: Number(change.toFixed(2)),
            pct: Number(pct.toFixed(2)),
          }
        } catch {
          return null
        }
      })
    )

    const valid = results.filter(Boolean)
    const sorted = [...valid].sort((a, b) => b.pct - a.pct)

    const gainers = sorted.filter(s => s.pct > 0).slice(0, 3)
    const losers = sorted.filter(s => s.pct < 0).slice(-3).reverse()
    const topStocks = valid.slice(0, 5)

    return Response.json({ stocks: valid, gainers, losers, topStocks })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}