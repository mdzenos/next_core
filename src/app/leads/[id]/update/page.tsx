'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLeadById, updateLeadAction } from '../../_actions/update';

export default function UpdateLeadPage({ params }: { params: { id: string } }) {
  const [lead, setLead] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getLeadById(params.id)
      .then((data) => setLead(data))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!lead) return <div className="p-6">Lead not found</div>;

  // State form ngay trong page
  const [name, setName] = useState(lead.name);
  const [email, setEmail] = useState(lead.email);
  const [status, setStatus] = useState(lead.status);
  const [owner, setOwner] = useState(lead.owner);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateLeadAction(params.id, { name, email, status, owner });
    router.push(`/leads/${params.id}`); // redirect về detail page
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Lead</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
        <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Owner" />
        <button type="submit" className="px-3 py-1 rounded bg-green-500 text-white">
          Save
        </button>
      </form>
    </div>
  );
}
