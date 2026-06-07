import Link from 'next/link'

const INDEX_DATA = {
  value: 115420.35,
  change: 423.50,
  pct: 0.37,
  volume: '2.3B',
  marketCap: '8.1T',
}

const GAINERS = [
  { ticker: 'MARI',  price: 1250.50, change: +45.20, pct: +3.75 },
  { ticker: 'HBL',   price: 156.80,  change: +5.60,  pct: +3.70 },
  { ticker: 'ENGRO', price: 298.40,  change: +8.90,  pct: +3.08 },
]

const LOSERS = [
  { ticker: 'PSO',   price: 432.10, change: -12.30, pct: -2.77 },
  { ticker: 'OGDC',  price: 890.25, change: -18.50, pct: -2.04 },
  { ticker: 'LUCK',  price: 542.00, change: -9.80,  pct: -1.78 },
]

const TOP_STOCKS = [
  { ticker: 'MARI',  price: 1250.50, sector: 'Oil & Gas' },
  { ticker: 'OGDC',  price: 890.25,  sector: 'Oil & Gas' },
  { ticker: 'HBL',   price: 156.80,  sector: 'Banking' },
  { ticker: 'ENGRO', price: 298.40,  sector: 'Fertilizer' },
  { ticker: 'PSO',   price: 432.10,  sector: 'Oil & Gas' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">📈 PSX Pulse</h1>
        <div className="flex gap-4 text-gray-300">
          <Link href="/dashboard" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Dashboard</Link>
          <Link href="/predict" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition">Predict</Link>
          <Link href="/watchlist" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Watchlist</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <span className="text-sm bg-blue-900 text-blue-300 px-3 py-1 rounded-full mb-6">
          Pakistan Stock Exchange — AI Powered
        </span>
        <h2 className="text-6xl font-extrabold mb-6 leading-tight">
          Predict PSX Stocks<br />
          <span className="text-blue-400">with AI</span>
        </h2>
        <p className="text-gray-400 text-xl max-w-xl mb-10">
          LSTM-powered next-day price predictions, Buy/Hold/Sell signals,
          and real-time sentiment analysis for PSX stocks.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/dashboard"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-lg transition">
            Open Dashboard →
          </Link>
          <Link href="/watchlist"
            className="border border-gray-600 hover:border-blue-400 text-gray-300 px-8 py-3 rounded-lg transition">
            My Watchlist
          </Link>
          <Link href="/predict"
            className="border border-blue-500 hover:bg-blue-500 text-blue-400 hover:text-white font-bold px-8 py-3 rounded-lg transition">
            AI Predict 🤖
          </Link>
        </div>
      </section>

      {/* PSX-100 Index Banner */}
      <section className="max-w-6xl mx-auto px-8 mb-10">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">PSX-100 Index</p>
              <p className="text-5xl font-extrabold text-white">
                {INDEX_DATA.value.toLocaleString()}
              </p>
              <p className="text-green-400 font-semibold mt-1">
                ▲ +{INDEX_DATA.change} (+{INDEX_DATA.pct}%) today
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-gray-400 text-sm">Volume</p>
                <p className="text-xl font-bold text-white">{INDEX_DATA.volume}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Market Cap</p>
                <p className="text-xl font-bold text-white">PKR {INDEX_DATA.marketCap}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Status</p>
                <p className="text-xl font-bold text-green-400">🟢 Open</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top 5 Stocks */}
      <section className="max-w-6xl mx-auto px-8 mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-200">🏆 Top PSX Stocks</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {TOP_STOCKS.map(s => (
            <div key={s.ticker} className="bg-gray-900 border border-gray-800 hover:border-blue-500 rounded-xl p-4 transition">
              <p className="text-blue-400 font-bold text-lg">{s.ticker}</p>
              <p className="text-white font-semibold">PKR {s.price.toLocaleString()}</p>
              <p className="text-gray-500 text-xs mt-1">{s.sector}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gainers & Losers */}
      <section className="max-w-6xl mx-auto px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Top Gainers */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4 text-green-400">🚀 Top Gainers</h2>
            {GAINERS.map(s => (
              <div key={s.ticker} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div>
                  <p className="font-bold text-white">{s.ticker}</p>
                  <p className="text-gray-400 text-sm">PKR {s.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-400 font-bold">+{s.pct}%</p>
                  <p className="text-green-400 text-sm">+{s.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Top Losers */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-4 text-red-400">📉 Top Losers</h2>
            {LOSERS.map(s => (
              <div key={s.ticker} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                <div>
                  <p className="font-bold text-white">{s.ticker}</p>
                  <p className="text-gray-400 text-sm">PKR {s.price.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-400 font-bold">{s.pct}%</p>
                  <p className="text-red-400 text-sm">{s.change}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}