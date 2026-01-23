import { connectDB } from "@/app/lib/mongos";
import PartnerApplication from "@/app/lib/models/PartnerApplication";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  const { replyMessage } = await req.json();

  if (!replyMessage) {
    return NextResponse.json(
      { error: "Reply message is required" },
      { status: 400 }
    );
  }

  const partner = await PartnerApplication.findById(id);

  if (!partner) {
    return NextResponse.json(
      { error: "Partner application not found" },
      { status: 404 }
    );
  }

  // 📧 Send Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Loan App Support" <${process.env.ADMIN_EMAIL}>`,
    to: partner.email,
    subject: "Regarding your Partner Application",
    text: replyMessage,
  });

  // ✅ Update DB
  partner.status = "REPLIED";
  partner.replyMessage = replyMessage;
  partner.repliedAt = new Date();
  await partner.save();

  return NextResponse.json({ success: true });
}
