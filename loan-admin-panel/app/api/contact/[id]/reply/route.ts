import { connectDB } from "../../../../lib/mongos";
import ContactMessage from "../../../../lib/models/ContactMessage";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();
  const { id } = await context.params;

  // ✅ NEW: Read the JSON body sent by the modal
  const body = await req.json();
  const { replyMessage } = body;
  const msg = await ContactMessage.findById(id);
  if (!msg) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
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
    to: msg.email,
    subject: `Re: ${msg.subject}`,
    text: replyMessage,
  });

  // ✅ Update DB AFTER email success
  msg.status = "REPLIED";
  msg.replyMessage = replyMessage;
  msg.repliedAt = new Date();
  await msg.save();

  return NextResponse.redirect(
    new URL("/admin/contact", process.env.NEXT_PUBLIC_BASE_URL!)
  );
}

