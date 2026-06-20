import Link from 'next/link'

const TICKER_DATA = [
  { ticker: 'MARI', price: 658.47, pct: -0.99 },
  { ticker: 'OGDC', price: 331.28, pct: -1.76 },
  { ticker: 'HBL', price: 298.39, pct: -1.98 },
  { ticker: 'ENGRO', price: 485.38, pct: 1.48 },
  { ticker: 'PSO', price: 357.14, pct: -1.07 },
  { ticker: 'LUCK', price: 462.98, pct: -1.82 },
  { ticker: 'FFC', price: 560.74, pct: -1.26 },
  { ticker: 'UBL', price: 438.18, pct: -1.54 },
  { ticker: 'MCB', price: 402.93, pct: -1.03 },
  { ticker: 'PPL', price: 241.94, pct: -2.86 },
]

const INDEX_DATA = { value: 115420.35, change: 423.50, pct: 0.37, volume: '2.3B', marketCap: '8.1T' }

const GAINERS = [
  { ticker: 'ENGRO', price: 485.38, change: 7.08, pct: 1.48 },
  { ticker: 'MARI', price: 658.47, change: 4.20, pct: 0.64 },
  { ticker: 'HBL', price: 298.39, change: 2.10, pct: 0.71 },
]

const LOSERS = [
  { ticker: 'PPL', price: 241.94, change: -7.12, pct: -2.86 },
  { ticker: 'LUCK', price: 462.98, change: -8.59, pct: -1.82 },
  { ticker: 'HBL', price: 298.39, change: -6.03, pct: -1.98 },
]

function TickerTape() {
  const row = [...TICKER_DATA, ...TICKER_DATA]
  return (
    <div style={{
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-subtle)',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '10px 0',
    }}>
      <div style={{
        display: 'inline-flex',
        animation: 'ticker-scroll 40s linear infinite',
      }}>
        {row.map((s, i) => (
          <span key={i} className="mono" style={{ padding: '0 28px', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{s.ticker}</span>
            <span style={{ color: 'var(--text-primary)' }}>{s.price.toFixed(2)}</span>
            <span style={{ color: s.pct >= 0 ? 'var(--green)' : 'var(--red)' }}>
              {s.pct >= 0 ? '▲' : '▼'} {Math.abs(s.pct).toFixed(2)}%
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px 32px', borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: '#FFFFFF' }}>PSX PULSE</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <Link href="/dashboard" style={{ color: '#FFFFFF', padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/predict" style={{ background: 'var(--amber-dim)', color: 'var(--amber)', padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Predict</Link>
          <Link href="/watchlist" style={{ color: '#FFFFFF', padding: '8px 16px', borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>Watchlist</Link>
        </div>
      </nav>

      {/* Ticker tape — signature element */}
      <TickerTape />

      {/* Hero */}
      <section style={{ padding: '64px 32px 48px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div className="mono" style={{
          display: 'inline-block', fontSize: 12, color: 'var(--green)', background: 'var(--green-dim)',
          padding: '6px 14px', borderRadius: 4, marginBottom: 24, letterSpacing: '0.05em',
        }}>
          ● LIVE — PAKISTAN STOCK EXCHANGE
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px', color: '#FFFFFF' }}>
          AI-powered signals.<br />
          <span style={{ color: 'var(--green)' }}>Real PSX data.</span>
        </h1>
        <p style={{ fontSize: 18, color: '#C5CAD6', maxWidth: 560, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Next-day price predictions, technical signals, and live market data
          for every major stock on the Pakistan Stock Exchange.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/dashboard" style={{
            background: 'var(--green)', color: '#000000', padding: '14px 28px',
            borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: 'none',
            display: 'inline-block',
          }}>
            Open Dashboard →
          </Link>
          <Link href="/predict" style={{
            border: '1px solid var(--border-subtle)', color: '#FFFFFF', padding: '14px 28px',
            borderRadius: 8, fontWeight: 600, fontSize: 15, textDecoration: 'none',
            display: 'inline-block', background: 'var(--bg-card)',
          }}>
            View AI Predictions
          </Link>
        </div>
      </section>

      {/* PSX-100 Index Strip */}
      <section style={{ maxWidth: 1100, margin: '0 auto 24px', padding: '0 32px' }}>
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 12, padding: '28px 32px',
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24,
        }}>
          <div>
            <p style={{ fontSize: 13, color: '#C5CAD6', margin: '0 0 6px', fontWeight: 500 }}>PSX-100 INDEX</p>
            <p className="mono" style={{ fontSize: 38, fontWeight: 700, margin: 0, color: '#FFFFFF' }}>{INDEX_DATA.value.toLocaleString()}</p>
            <p className="mono" style={{ color: 'var(--green)', fontSize: 14, fontWeight: 600, margin: '4px 0 0' }}>
              ▲ +{INDEX_DATA.change} (+{INDEX_DATA.pct}%) today
            </p>
          </div>
          <div style={{ display: 'flex', gap: 40 }}>
            <div>
              <p style={{ fontSize: 12, color: '#C5CAD6', margin: '0 0 4px' }}>VOLUME</p>
              <p className="mono" style={{ fontSize: 18, fontWeight: 600, margin: 0, color: '#FFFFFF' }}>{INDEX_DATA.volume}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#C5CAD6', margin: '0 0 4px' }}>MARKET CAP</p>
              <p className="mono" style={{ fontSize: 18, fontWeight: 600, margin: 0, color: '#FFFFFF' }}>PKR {INDEX_DATA.marketCap}</p>
            </div>
            <div>
              <p style={{ fontSize: 12, color: '#C5CAD6', margin: '0 0 4px' }}>STATUS</p>
              <p className="mono" style={{ fontSize: 18, fontWeight: 600, margin: 0, color: 'var(--green)' }}>● OPEN</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Stocks */}
      <section style={{ maxWidth: 1100, margin: '0 auto 24px', padding: '0 32px' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#C5CAD6', margin: '0 0 12px', letterSpacing: '0.03em' }}>TOP STOCKS</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {TICKER_DATA.slice(0, 5).map(s => (
            <Link key={s.ticker} href={`/dashboard?symbol=${s.ticker}`} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 10, padding: '16px', textDecoration: 'none', color: 'inherit', display: 'block',
            }}>
              <p className="mono" style={{ fontSize: 14, fontWeight: 700, margin: '0 0 6px', color: '#FFFFFF' }}>{s.ticker}</p>
              <p className="mono" style={{ fontSize: 17, fontWeight: 600, margin: '0 0 4px', color: '#FFFFFF' }}>{s.price.toFixed(2)}</p>
              <p className="mono" style={{ fontSize: 13, fontWeight: 600, margin: 0, color: s.pct >= 0 ? 'var(--green)' : 'var(--red)' }}>
                {s.pct >= 0 ? '▲' : '▼'} {Math.abs(s.pct).toFixed(2)}%
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Gainers & Losers */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--green)', margin: '0 0 16px', letterSpacing: '0.03em' }}>▲ TOP GAINERS</p>
            {GAINERS.map((s, i) => (
              <div key={s.ticker} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
              }}>
                <div>
                  <p className="mono" style={{ fontWeight: 700, margin: 0, fontSize: 14, color: '#FFFFFF' }}>{s.ticker}</p>
                  <p className="mono" style={{ color: '#C5CAD6', fontSize: 13, margin: '2px 0 0' }}>{s.price.toFixed(2)}</p>
                </div>
                <p className="mono" style={{ color: 'var(--green)', fontWeight: 700, margin: 0, fontSize: 14 }}>+{s.pct.toFixed(2)}%</p>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 24 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--red)', margin: '0 0 16px', letterSpacing: '0.03em' }}>▼ TOP LOSERS</p>
            {LOSERS.map((s, i) => (
              <div key={s.ticker} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-subtle)',
              }}>
                <div>
                  <p className="mono" style={{ fontWeight: 700, margin: 0, fontSize: 14, color: '#FFFFFF' }}>{s.ticker}</p>
                  <p className="mono" style={{ color: '#C5CAD6', fontSize: 13, margin: '2px 0 0' }}>{s.price.toFixed(2)}</p>
                </div>
                <p className="mono" style={{ color: 'var(--red)', fontWeight: 700, margin: 0, fontSize: 14 }}>{s.pct.toFixed(2)}%</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}