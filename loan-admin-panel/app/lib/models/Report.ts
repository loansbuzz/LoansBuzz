import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReport extends Document {
  userId: Types.ObjectId;
  name: string;
  mobile: string;
  panCard?: string;
  reportType: string;
  reportUrl?: string;
  reportFormat?: "pdf" | "json" | "score";
  reportData?: Record<string, unknown> | null;
  creditSummary?: Record<string, unknown> | null;
  score?: number | null;
  provider?: string;
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

    name: {
      type: String,
      required: true,
      trim: true,
    },

    mobile: {
      type: String,
      required: true,
      trim: true,
    },

    // CRIF does not require PAN
    panCard: {
      type: String,
      required: false,
      default: "",
    },

    reportType: {
      type: String,
      required: true,
    },

    // Failed requests do not have a report URL
    reportUrl: {
      type: String,
      required: false,
      default: "",
    },

    reportFormat: {
      type: String, enum: ["pdf", "json", "score"], default: "pdf",
    },
    reportData: { type: Schema.Types.Mixed, default: null },
    creditSummary: { type: Schema.Types.Mixed, default: null },
    score: { type: Number, default: null },
    provider: { type: String, default: "verifyal" },

    requestId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ReportSchema.index({
  userId: 1,
  createdAt: -1,
});

const Report: Model<IReport> =
  mongoose.models.Report ||
  mongoose.model<IReport>("Report", ReportSchema);

export default Report;