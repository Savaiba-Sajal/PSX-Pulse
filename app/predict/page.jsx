'use client'
import { useState } from 'react'
import Link from 'next/link'

const SIGNALS = {
  MARI:  { signal: 'BUY',  confidence: 82, rsi: 38, macd: 'Bullish', ma: 'Above 50-day', price: 1250.50 },
  OGDC:  { signal: 'HOLD', confidence: 61, rsi: 52, macd: 'Neutral',  ma: 'Below 50-day', price: 890.25 },
  HBL:   { signal: 'BUY',  confidence: 74, rsi: 42, macd: 'Bullish', ma: 'Above 50-day', price: 156.80 },
  ENGRO: { signal: 'SELL', confidence: 78, rsi: 71, macd: 'Bearish', ma: 'Below 20-day', price: 298.40 },
  PSO:   { signal: 'HOLD', confidence: 55, rsi: 49, macd: 'Neutral',  ma: 'Above 20-day', price: 432.10 },
}

const signalColors = {
  BUY:  { bg: 'bg-green-900', text: 'text-green-400', border: 'border-green-500' },
  HOLD: { bg: 'bg-yellow-900', text: 'text-yellow-400', border: 'border-yellow-500' },
  SELL: { bg: 'bg-red-900', text: 'text-red-400', border: 'border-red-500' },
}

export default function Predict() {
  const [selected, setSelected] = useState('MARI')
  const data = SIGNALS[selected]
  const colors = signalColors[data.signal]

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">

      {/* Navbar */}
      <nav className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <Link href="/" className="text-2xl font-bold text-blue-400">📈 PSX AI Suite</Link>
        <div className="flex gap-6 text-gray-300">
          <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link href="/predict" className="text-blue-400 font-semibold">Predict</Link>
          <Link href="/watchlist" className="hover:text-blue-400">Watchlist</Link>
        </div>
      </nav>

      <h1 className="text-3xl font-bold text-blue-400 mb-2 text-center">🤖 AI Predictions</h1>
      <p className="text-gray-400 mb-8 text-center">Buy / Hold / Sell signals with confidence scores</p>

      {/* Ticker Selector */}
      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {Object.keys(SIGNALS).map(t => (
          <button key={t} onClick={() => setSelected(t)}
            className={`px-5 py-2 rounded-lg font-semibold transition ${
              selected === t
                ? 'bg-blue-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Main Signal Card */}
      <div className={`border ${colors.border} ${colors.bg} rounded-2xl p-8 max-w-lg mb-8 mx-auto`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">Stock</p>
            <p className="text-4xl font-extrabold">{selected}</p>
          </div>
          <div className={`text-5xl font-extrabold ${colors.text}`}>
            {data.signal}
          </div>
        </div>

        {/* Confidence Bar */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-400 text-sm">AI Confidence</span>
            <span className={`font-bold ${colors.text}`}>{data.confidence}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                data.signal === 'BUY' ? 'bg-green-400' :
                data.signal === 'SELL' ? 'bg-red-400' : 'bg-yellow-400'
              }`}
              style={{ width: `${data.confidence}%` }}>
            </div>
          </div>
        </div>

        {/* Current Price */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <p className="text-gray-400 text-sm">Current Price</p>
          <p className="text-2xl font-bold text-white">PKR {data.price.toLocaleString()}</p>
        </div>
      </div>

      {/* Technical Indicators */}
      <div className="max-w-lg mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">📊 Technical Indicators</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'RSI (14)', value: data.rsi, note: data.rsi < 40 ? '🟢 Oversold — potential upside' : data.rsi > 60 ? '🔴 Overbought — potential drop' : '🟡 Neutral zone' },
            { label: 'MACD Signal', value: data.macd, note: data.macd === 'Bullish' ? '🟢 Upward momentum' : data.macd === 'Bearish' ? '🔴 Downward momentum' : '🟡 No clear trend' },
            { label: 'Moving Average', value: data.ma, note: data.ma.includes('Above') ? '🟢 Price above average — bullish' : '🔴 Price below average — bearish' },
          ].map(ind => (
            <div key={ind.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <p className="text-gray-400 text-sm">{ind.label}</p>
                <p className="font-bold text-white">{ind.value}</p>
              </div>
              <p className="text-sm text-gray-500">{ind.note}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-gray-600 text-xs mt-6 text-center">
          ⚠️ These are AI-generated signals. Not financial advice. Always do your own research.
        </p>
      </div>

    </main>
  )
}