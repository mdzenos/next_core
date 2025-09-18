'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Table } from '@/components/molecules/Table';
import { TableRow } from '@/components/molecules/TableRow';
import { getLeads, deleteLeadAction } from './actions';

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        setLoading(true);
        const data = await getLeads();
        setLeads(data);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc muốn xóa lead này?')) {
      try {
        await deleteLeadAction(id);
        setLeads(leads.filter((lead) => lead.id !== id));
      } catch (error) {
        console.error('Failed to delete lead:', error);
      }
    }
  };

  return (
    <div className="p-6">
      {/* Header luôn hiển thị */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Link href="/leads/create">
          <button className="px-3 py-1 rounded bg-blue-600 text-white">
            + New Lead
          </button>
        </Link>
      </div>

      {/* Loading state */}
      {loading && <div>Loading...</div>}

      {/* No data state */}
      {!loading && (!leads || leads.length === 0) && (
        <div className="text-gray-500">Leads not found</div>
      )}

      {/* Table */}
      {!loading && leads && leads.length > 0 && (
        <Table>
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <TableRow key={l.id}>
                <td className="p-2">{l.name}</td>
                <td className="p-2">{l.email}</td>
                <td className="p-2">{l.status}</td>
                <td className="p-2 flex gap-2">
                  <Link href={`/leads/${l.id}`}>
                    <button className="px-2 py-1 bg-gray-300 rounded">View</button>
                  </Link>
                  <Link href={`/leads/${l.id}/update`}>
                    <button className="px-2 py-1 bg-yellow-500 text-white rounded">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleDelete(l.id)}
                  >
                    Delete
                  </button>
                </td>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
