import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-400">📈 PSX AI Suite</h1>
        <div className="flex gap-4 text-gray-300">
          <Link href="/dashboard" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Dashboard</Link>
          <Link href="/predict" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 py-2 rounded-lg transition">Predict</Link>
          <Link href="/watchlist" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Watchlist</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center py-32 px-4">
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

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-20 max-w-6xl mx-auto">
        {[
          { icon: "🤖", title: "LSTM Prediction", desc: "Deep learning model trained on 4 years of PSX data to forecast next-day closing prices." },
          { icon: "📊", title: "Buy/Hold/Sell Signals", desc: "RSI, MACD, and Moving Averages combined into a single AI-backed recommendation." },
          { icon: "📰", title: "Sentiment Analysis", desc: "NLP scans Pakistan financial news and scores market mood in real time." },
        ].map((f) => (
          <div key={f.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition">
            <div className="text-4xl mb-3">{f.icon}</div>
            <h3 className="text-lg font-bold mb-2">{f.title}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </section>

    </main>
  )
}