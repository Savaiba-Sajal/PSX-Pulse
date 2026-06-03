'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Link from 'next/link'

const TICKERS = ['MARI', 'OGDC', 'HBL', 'ENGRO', 'PSO']

export default function Dashboard() {
  const [selected, setSelected] = useState('MARI')
  const [prices, setPrices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPrices() {
      setLoading(true)
      const { data } = await supabase
        .from('stock_prices')
        .select('date, close')
        .eq('ticker', selected)
        .order('date', { ascending: true })
        .limit(90)
      setPrices(data || [])
      setLoading(false)
    }
    fetchPrices()
  }, [selected])

  const latest = prices[prices.length - 1]?.close || 0
  const prev = prices[prices.length - 2]?.close || 0
  const change = latest - prev
  const pct = prev ? ((change / prev) * 100).toFixed(2) : 0

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">

      {/* Navbar */}
      <nav className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <Link href="/" className="text-2xl font-bold text-blue-400">📈 PSX AI Suite</Link>
        <div className="flex gap-6 text-gray-300">
          <Link href="/dashboard" className="text-blue-400 font-semibold">Dashboard</Link>
          <Link href="/predict" className="hover:text-blue-400">Predict</Link>
          <Link href="/watchlist" className="hover:text-blue-400">Watchlist</Link>
        </div>
      </nav>

      <h1 className="text-3xl font-bold text-blue-400 mb-2">📊 Dashboard</h1>
      <p className="text-gray-400 mb-8">Live PSX stock prices from your database</p>

      {/* Ticker selector */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {TICKERS.map(t => (
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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Stock', value: selected },
          { label: 'Last Close (PKR)', value: latest ? latest.toFixed(2) : '—' },
          { label: 'Change', value: change ? `${change > 0 ? '+' : ''}${change.toFixed(2)}` : '—', color: change >= 0 ? 'text-green-400' : 'text-red-400' },
          { label: 'Change %', value: `${pct}%`, color: change >= 0 ? 'text-green-400' : 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color || 'text-white'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">{selected} — Last 90 Days</h2>
        {loading ? (
          <p className="text-gray-500 text-center py-20">Loading chart...</p>
        ) : prices.length === 0 ? (
          <p className="text-gray-500 text-center py-20">
            No data yet — we will add stock data in the next step!
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={prices}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 11 }}
                tickFormatter={d => d.slice(5)} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151' }} />
              <Line type="monotone" dataKey="close" stroke="#3b82f6"
                strokeWidth={2} dot={false} name="Close Price" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </main>
  )
}