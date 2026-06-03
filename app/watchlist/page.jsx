'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Watchlist() {
  const [ticker, setTicker] = useState('')
  const [email, setEmail] = useState('')
  const [list, setList] = useState([])
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchList() }, [])

  async function fetchList() {
    const { data } = await supabase
      .from('watchlist')
      .select('*')
      .order('created_at', { ascending: false })
    setList(data || [])
  }

  async function handleAdd() {
    if (!ticker || !email) return setMsg('⚠️ Please fill both fields.')
    setLoading(true)
    const { error } = await supabase
      .from('watchlist')
      .insert([{ ticker: ticker.toUpperCase(), email }])
    if (error) return setMsg('❌ Error saving. Try again.')

    await fetch('/api/alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, ticker: ticker.toUpperCase() })
    })

    setMsg(`✅ ${ticker.toUpperCase()} added! Confirmation email sent to ${email}.`)
    setTicker('')
    setEmail('')
    setLoading(false)
    fetchList()
  }

  async function handleRemove(id) {
    await supabase.from('watchlist').delete().eq('id', id)
    fetchList()
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">

      {/* Navbar */}
      <nav className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <Link href="/" className="text-2xl font-bold text-blue-400">📈 PSX AI Suite</Link>
        <div className="flex gap-6 text-gray-300">
          <Link href="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link href="/predict" className="hover:text-blue-400">Predict</Link>
          <Link href="/watchlist" className="text-blue-400 font-semibold">Watchlist</Link>
        </div>
      </nav>

      <h1 className="text-3xl font-bold text-blue-400 mb-2">⭐ My Watchlist</h1>
      <p className="text-gray-400 mb-8">Track stocks and get email alerts</p>

      {/* Add Stock Form */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Add a Stock</h2>
        <input
          value={ticker}
          onChange={e => setTicker(e.target.value)}
          placeholder="Ticker (e.g. MARI)"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email for alerts"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 mb-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
        <button
          onClick={handleAdd}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-800 text-white font-bold py-2 rounded-lg transition">
          {loading ? 'Adding...' : 'Add to Watchlist + Get Alerts'}
        </button>
        {msg && <p className="mt-3 text-sm text-green-400">{msg}</p>}
      </div>

      {/* Watchlist */}
      <div className="max-w-lg">
        <h2 className="text-lg font-semibold mb-4">Your Stocks</h2>
        {list.length === 0 ? (
          <p className="text-gray-500">No stocks added yet.</p>
        ) : (
          list.map(item => (
            <div key={item.id}
              className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-5 py-3 mb-3">
              <div>
                <p className="font-bold text-blue-400">{item.ticker}</p>
                <p className="text-gray-400 text-sm">{item.email}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-400 hover:text-red-300 text-sm">
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  )
}