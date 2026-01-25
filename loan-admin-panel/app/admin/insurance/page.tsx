import { connectDB } from "@/app/lib/mongos";
import InsuranceQuote from "@/app/lib/models/InsuranceQuote";
import InsuranceTable from "./InsuranceTable";

export const dynamic = "force-dynamic";

export default async function InsuranceAdminPage() {
  await connectDB();

  // Fetch data
  const quotes = await InsuranceQuote.find()
    .sort({ createdAt: -1 })
    .lean()
    .then((docs) =>
      docs.map((doc) => ({
        ...doc,
        _id: doc._id.toString(),
        createdAt: doc.createdAt?.toISOString(),
        // Map message field if it exists, otherwise use placeholder
        // message: doc.message || "" 
      }))
    );

  return (
    // FIXED: Solid white background and dark text for the whole page
    <main className="min-h-screen bg-white text-gray-900">
      <InsuranceTable quotes={quotes} />
    </main>
  );
}
