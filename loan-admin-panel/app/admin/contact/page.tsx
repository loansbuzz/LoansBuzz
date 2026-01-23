import { connectDB } from "../../lib/mongos";
import ContactMessage from "../../lib/models/ContactMessage";
import ContactTable from "./ContactTable";
export const dynamic = "force-dynamic";

export default async function ContactMessagesPage() {
  await connectDB();

  const messages = await ContactMessage.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      

      <ContactTable messages={JSON.parse(JSON.stringify(messages))} />
    </div>
  );
}
