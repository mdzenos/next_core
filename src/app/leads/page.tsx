import Link from 'next/link';
import { Table } from '@/components/molecules/Table';
import { TableRow } from '@/components/molecules/TableRow';
import { db } from '@/lib/db';

export default async function LeadsPage() {
  const leads = await db.all('leads');
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Link href="/leads/create">
          <button className="px-3 py-1 rounded bg-blue-600 text-white">+ New Lead</button>
        </Link>
      </div>

      <Table>
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <TableRow key={l.id}>
              <td className="p-2">{l.name}</td>
              <td className="p-2">{l.email}</td>
              <td className="p-2">{l.status}</td>
              <td className="p-2">
                <Link href={`/leads/${l.id}`}>View</Link>
              </td>
              <td className="p-2">
                <Link href={`/leads/${l.id}/update`}>Edit</Link>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
