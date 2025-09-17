import { db } from '@/lib/db';
import Link from 'next/link';
export default async function LeadDetail({ params }) {
  const lead = await db.findById('leads', params.id);
  if (!lead) return <div className="p-6">Lead not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{lead.name}</h1>
      <p>Email: {lead.email}</p>
      <p>Status: {lead.status}</p>
      <p>Owner: {lead.owner}</p>
      <div className="mt-4 flex gap-2">
        <Link href={`/leads/${lead.id}/update`}>
          <button className="px-3 py-1 rounded bg-yellow-500 text-white">Edit</button>
        </Link>
      </div>
    </div>
  );
}
