import './globals.css'

export const metadata = {
  title: 'PSX AI Suite',
  description: 'Pakistan Stock Exchange AI Powered Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}