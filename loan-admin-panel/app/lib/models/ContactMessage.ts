import mongoose, { Schema } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    fullName: String,
    email: String,
    phone: String,
    subject: String,
    message: String,

    status: {
      type: String,
      enum: ["PENDING", "REPLIED"],
      default: "PENDING",
    },

    replyMessage: String,
    repliedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);
