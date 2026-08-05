import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReport extends Document {
  userId: Types.ObjectId;
  name: string;
  mobile: string;
  panCard: string;
  reportType: string;
  reportUrl: string;
  requestId: string | null;
  status: "success" | "failed";
  createdAt: Date;
}

const ReportSchema = new Schema<IReport>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    panCard: { type: String, required: true },
    reportType: { type: String, required: true },
    reportUrl: { type: String, required: true },
    requestId: { type: String, default: null },
    status: { type: String, enum: ["success", "failed"], default: "success" },
  },
  { timestamps: true }
);

// Fast "my reports" lookups, most recent first
ReportSchema.index({ userId: 1, createdAt: -1 });

const Report: Model<IReport> = mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);

export default Report;