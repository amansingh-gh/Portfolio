import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const { name, email, subject, message } = req.body;
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "akaman.revel@gmail.com",

      replyTo: email,

      subject: `Portfolio Contact | ${subject}`,

      html: `
    <h2>📩 New Portfolio Contact</h2>

    <p><strong>Name:</strong> ${name}</p>

    <p><strong>Email:</strong> ${email}</p>

    <p><strong>Subject:</strong> ${subject}</p>

    <hr>

    <p>${message}</p>
  `,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
    });
  }
}
