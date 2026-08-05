import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOtp extends Document {
  email: string;
  otpHash: string;
  attempts: number;
  verified: boolean;
  createdAt: Date;
  expiresAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  otpHash: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    // TTL index: MongoDB automatically deletes the document once
    // the current time passes `expiresAt`. expireAfterSeconds: 0 means
    // "expire exactly at the stored date", not 0 seconds after creation.
    index: { expires: 0 },
  },
});

// Helpful for quickly finding the latest active OTP for an email
OtpSchema.index({ email: 1, createdAt: -1 });

const Otp: Model<IOtp> = mongoose.models.Otp || mongoose.model<IOtp>("Otp", OtpSchema);

export default Otp;