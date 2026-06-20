import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Calculate RSI (14-period)
function calculateRSI(closes, period = 14) {
  if (closes.length < period + 1) return null
  let gains = 0, losses = 0
  for (let i = closes.length - period; i < closes.length; i++) {
    const diff = closes[i] - closes[i - 1]
    if (diff >= 0) gains += diff
    else losses -= diff
  }
  const avgGain = gains / period
  const avgLoss = losses / period
  if (avgLoss === 0) return 100
  const rs = avgGain / avgLoss
  return 100 - (100 / (1 + rs))
}

// Calculate EMA
function calculateEMA(closes, period) {
  const k = 2 / (period + 1)
  let ema = closes[0]
  for (let i = 1; i < closes.length; i++) {
    ema = closes[i] * k + ema * (1 - k)
  }
  return ema
}

// Calculate MACD (12, 26 EMA difference)
function calculateMACD(closes) {
  if (closes.length < 26) return null
  const ema12 = calculateEMA(closes.slice(-26), 12)
  const ema26 = calculateEMA(closes.slice(-26), 26)
  return ema12 - ema26
}

// Simple Moving Average
function calculateSMA(closes, period) {
  if (closes.length < period) return null
  const slice = closes.slice(-period)
  return slice.reduce((a, b) => a + b, 0) / slice.length
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const symbol = searchParams.get('symbol')

  if (!symbol) {
    return Response.json({ error: 'Symbol required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('stock_prices')
    .select('date, close')
    .eq('ticker', symbol)
    .order('date', { ascending: true })

  if (error || !data || data.length < 20) {
    return Response.json({ error: 'Not enough data for this stock' }, { status: 404 })
  }

  const closes = data.map(d => d.close)
  const currentPrice = closes[closes.length - 1]

  const rsi = calculateRSI(closes)
  const macd = calculateMACD(closes)
  const sma20 = calculateSMA(closes, 20)
  const sma50 = calculateSMA(closes, Math.min(50, closes.length))

  // Scoring logic
  let score = 0
  let reasons = []

  if (rsi !== null) {
    if (rsi < 30) { score += 2; reasons.push('RSI oversold (bullish)') }
    else if (rsi > 70) { score -= 2; reasons.push('RSI overbought (bearish)') }
  }

  if (macd !== null) {
    if (macd > 0) { score += 1; reasons.push('MACD positive (bullish momentum)') }
    else { score -= 1; reasons.push('MACD negative (bearish momentum)') }
  }

  if (sma20 !== null && currentPrice > sma20) { score += 1; reasons.push('Price above 20-day average') }
  else if (sma20 !== null) { score -= 1; reasons.push('Price below 20-day average') }

  if (sma50 !== null && currentPrice > sma50) { score += 1; reasons.push('Price above 50-day average') }
  else if (sma50 !== null) { score -= 1; reasons.push('Price below 50-day average') }

  let signal = 'HOLD'
  if (score >= 2) signal = 'BUY'
  else if (score <= -2) signal = 'SELL'

  const confidence = Math.min(95, 50 + Math.abs(score) * 9)

  return Response.json({
    symbol,
    signal,
    confidence,
    price: currentPrice,
    rsi: rsi !== null ? Math.round(rsi) : null,
    macd: macd !== null ? (macd > 0 ? 'Bullish' : 'Bearish') : null,
    sma20: sma20 !== null ? Math.round(sma20 * 100) / 100 : null,
    sma50: sma50 !== null ? Math.round(sma50 * 100) / 100 : null,
    aboveSma20: sma20 !== null ? currentPrice > sma20 : null,
    reasons,
  })
}