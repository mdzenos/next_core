import Link from 'next/link';
import { Table } from '@/components/molecules/Table';
import { TableRow } from '@/components/molecules/TableRow';
import { db } from '@/lib/db';

export default async function AccountsPage() {
  const accounts = await db.all('accounts');
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Accounts</h1>
        <Link href="/(crm)/accounts/create">
          <button className="px-3 py-1 rounded bg-blue-600 text-white">+ New Account</button>
        </Link>
      </div>

      <Table>
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Industry</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((a) => (
            <TableRow key={a.id}>
              <td className="p-2">{a.name}</td>
              <td className="p-2">{a.industry}</td>
              <td className="p-2">
                <Link href={`/(crm)/accounts/${a.id}`}>View</Link>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
