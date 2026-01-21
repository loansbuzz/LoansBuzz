import mongoose, { Schema, models } from "mongoose";

const PartnerSchema = new Schema(
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

    city: {
      type: String,
      required: true,
    },

    experience: {
      type: String, // 0 | 1-2 | 3-5 | 5+
      default: "",
    },

    panNumber: {
      type: String,
      required: true,
      uppercase: true,
    },

    aadhaarNumber: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      default: "",
    },

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

export default models.Partner ||
  mongoose.model("Partner", PartnerSchema);
