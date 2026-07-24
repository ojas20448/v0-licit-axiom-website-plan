import { NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, practiceArea, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "First Name, Last Name, Email, and Message are required fields." },
        { status: 400 }
      )
    }

    const emailContent = `
      <h2>New Contact Form Inquiry - Licit Axiom Website</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Practice Area of Interest:</strong> ${practiceArea || "General Inquiry"}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background: #f4f4f5; padding: 12px; border-radius: 6px;">${message}</p>
    `

    // Send email using Resend API if API key is configured
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey) {
      const resend = new Resend(apiKey)
      const data = await resend.emails.send({
        from: "Licit Axiom Contact Form <onboarding@resend.dev>",
        to: ["mail@licitaxiom.com"],
        subject: `New Inquiry from ${firstName} ${lastName} (${practiceArea || "General"})`,
        html: emailContent,
        replyTo: email,
      })

      return NextResponse.json({ success: true, data })
    }

    // Dev fallback if key is not configured
    console.log("Contact Form Submission:", { firstName, lastName, email, phone, practiceArea, message })
    return NextResponse.json({ success: true, message: "Form submission processed successfully" })
  } catch (error: any) {
    console.error("Error processing contact form:", error)
    return NextResponse.json({ error: error.message || "Failed to send email." }, { status: 500 })
  }
}
