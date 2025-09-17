// app/leads/[id]/update/page.tsx
'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLeadById, updateLeadAction } from '../../_actions/update';
import type { UpdateLeadInput } from '../../_schemas';

export default function UpdateLeadPage({ params }: { params: Promise<{ id: string }> }) {
  // unwrap Promise (Next.js 15 params)
  const { id } = use(params);
  const router = useRouter();

  const [lead, setLead] = useState<UpdateLeadInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    getLeadById(id)
      .then((data) => {
        if (data) {
          setLead(data);
          setName(data.name ?? '');
          setEmail(data.email ?? '');
          setStatus(data.status ?? '');
          setOwner(data.owner ?? '');
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!lead) return <div className="p-6">Lead not found</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await updateLeadAction({ id: lead.id, name, email, status, owner });

    if (!res.ok) {
      setErrors(res.errors ?? {});
      return;
    }

    router.push('/leads');
  };

  const renderErrors = (field: string) =>
    errors[field]?.map((err, i) => (
      <p key={i} className="text-red-500 text-sm">
        {err}
      </p>
    ));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Update Lead</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 w-full"
          />
          {renderErrors('name')}
        </div>

        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {renderErrors('email')}
        </div>

        <div>
          <input
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Status"
            className="border p-2 w-full"
          />
          {renderErrors('status')}
        </div>

        <div>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Owner"
            className="border p-2 w-full"
          />
          {renderErrors('owner')}
        </div>

        <button type="submit" className="px-3 py-1 rounded bg-green-500 text-white">
          Save
        </button>
      </form>
    </div>
  );
}
