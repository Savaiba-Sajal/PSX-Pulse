import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  const { email, ticker } = await request.json()

  try {
    await resend.emails.send({
      from: 'PSX AI Suite <onboarding@resend.dev>',
      to: email,
      subject: `✅ Now watching ${ticker} on PSX AI Suite`,
      html: `
        <div style="font-family: Arial; max-width: 500px; margin: auto; padding: 24px; background: #0f172a; color: white; border-radius: 12px;">
          <h2 style="color: #60a5fa;">📈 PSX AI Suite</h2>
          <p>You're now tracking <strong style="color: #60a5fa;">${ticker}</strong>.</p>
          <p style="color: #9ca3af;">You'll receive alerts when our AI model detects a strong Buy or Sell signal for this stock.</p>
          <hr style="border-color: #1f2937; margin: 20px 0;" />
          <p style="color: #6b7280; font-size: 12px;">Pakistan Stock Exchange AI Suite</p>
        </div>
      `
    })
    return Response.json({ success: true })
  } catch (error) {
    return Response.json({ success: false, error: error.message })
  }
}