import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, product } = body;

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL || "your-email@gmail.com", // fallback for now
        pass: process.env.SMTP_PASSWORD || "your-app-password",
      },
    });

    // Email content
    const subject = product
      ? `New Product Enquiry: ${product}`
      : `New Contact Form Submission from ${name}`;
    const text = `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      
      Message: ${message}
      
      ${product ? `Product of Interest: ${product}` : ""}
    `;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: "kothari_1@hotmail.com", // Admin email
      subject: subject,
      text: text,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
