import Link from 'next/link';
import { Table } from '@/components/molecules/Table';
import { TableRow } from '@/components/molecules/TableRow';
import { db } from '@/lib/db';

export default async function ContactsPage() {
  const contacts = await db.all('contacts');
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link href="/(crm)/contacts/create">
          <button className="px-3 py-1 rounded bg-blue-600 text-white">+ New Contact</button>
        </Link>
      </div>

      <Table>
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <TableRow key={c.id}>
              <td className="p-2">{c.firstName} {c.lastName || ''}</td>
              <td className="p-2">{c.email}</td>
              <td className="p-2">
                <Link href={`/(crm)/contacts/${c.id}`}>View</Link>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
