import { connectDB } from "@/app/lib/mongos";
import PartnerApplication from "@/app/lib/models/PartnerApplication";
import PartnerTable from "./PartnerTable";

export default async function PartnersPage() {
  await connectDB();

  const partners = await PartnerApplication.find()
    .sort({ createdAt: -1 })
    .lean();

  // ✅ SERIALIZE DATA FOR CLIENT COMPONENT
  const serializedPartners = partners.map((p: any) => ({
    _id: p._id.toString(),
    fullName: p.fullName,
    email: p.email,
    phone: p.phone,
    city: p.city,
    experience: p.experience,
    panNumber: p.panNumber,
    aadhaarNumber: p.aadhaarNumber,
    message: p.message,
    status: p.status,
    createdAt: p.createdAt?.toISOString(),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <PartnerTable partners={serializedPartners} />
      </div>
    </div>
  );
}
