export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol') || 'MARI'

  try {
    const res = await fetch(`https://dps.psx.com.pk/timeseries/eod/${symbol}`)
    const json = await res.json()

    if (json.status !== 1 || !json.data) {
      return Response.json({ error: 'No data found' }, { status: 404 })
    }

    // PSX format: [timestamp, close, volume, open]
    const formatted = json.data
      .map(row => {
        const [timestamp, close, volume, open] = row
        const date = new Date(timestamp * 1000).toISOString().split('T')[0]
        return { date, open, close, volume }
      })
      .reverse() // oldest first for charts

    return Response.json({ symbol, data: formatted })
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}