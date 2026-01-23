import mongoose, { Schema, models } from "mongoose";

const InsuranceQuoteSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    insuranceType: {
      type: String,
      required: true,
      enum: [
        "Life Insurance",
        "Health Insurance",
        "Motor Insurance",
        "Home Insurance",
        "Travel Insurance",
      ],
    },
    status: {
      type: String,
      enum: ["PENDING", "RESPONDED"],
      default: "PENDING",
    },
    replyMessage: {
      type: String,
    },
    repliedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default models.InsuranceQuote ||
  mongoose.model("InsuranceQuote", InsuranceQuoteSchema);
