import { connectDB } from "@/app/lib/mongos";
import InsuranceQuote from "@/app/lib/models/InsuranceQuote";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    // ✅ FIX: await params
    const { id } = await context.params;

    const { replyMessage } = await req.json();

    if (!replyMessage) {
      return NextResponse.json(
        { error: "Reply message is required" },
        { status: 400 }
      );
    }

    const quote = await InsuranceQuote.findById(id);

    if (!quote) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    // 📧 Mail Transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Loan App Support" <${process.env.ADMIN_EMAIL}>`,
      to: quote.email,
      subject: `Re: ${quote.insuranceType} Quote`,
      text: replyMessage,
    });

    // ✅ Update DB
    quote.status = "RESPONDED";
    quote.replyMessage = replyMessage;
    quote.repliedAt = new Date();
    await quote.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("INSURANCE_REPLY_ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
