'use client';

import Link from "next/link";
import { getLeadById } from "../actions";
import { use, useState, useEffect } from 'react';

export default function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  // unwrap params với React.use()
  const { id } = use(params);

  const [lead, setLead] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLead() {
      try {
        setLoading(true);
        const data = await getLeadById(id);
        setLead(data);
      } catch (error) {
        console.error("Failed to fetch lead:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLead();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!lead) return <div>Lead not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{lead.name}</h1>
      <p>Email: {lead.email}</p>
      <p>Status: {lead.status}</p>
      <p>Owner: {lead.owner}</p>

      <div className="mt-4 flex gap-2">
        <Link href={`/leads/${id}/update`}>
          <button className="px-3 py-1 rounded bg-yellow-500 text-white">Edit</button>
        </Link>
      </div>
    </div>
  );
}
