// app/leads/page.tsx
import Link from "next/link";
import { getLeads } from "./apis";
import { Table } from "@/components/molecules/Table";
import { TableRow } from "@/components/molecules/TableRow";
import { DeleteLeadButton } from "./actions";
import { Lead } from "@/types";

export default async function LeadsPage() {
  const leads = await getLeads();

  const hasNoLeads = !leads || leads.length === 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Link href="/leads/create">
          <button className="px-3 py-1 rounded bg-blue-600 text-white">
            + New Lead
          </button>
        </Link>
      </div>

      {/* Empty state */}
      {hasNoLeads ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <p className="mb-2 text-lg font-semibold">No leads found</p>
          <p className="mb-4">Start by creating your first lead.</p>
          <Link href="/leads/create">
            <button className="px-4 py-2 rounded bg-blue-600 text-white">
              + Create Lead
            </button>
          </Link>
        </div>
      ) : (
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
            {leads.map((l: Lead) => (
              <TableRow key={l.id}>
                <td className="p-2">{l?.title ?? "N/A"}</td>
                <td className="p-2">{l?.description ?? "N/A"}</td>
                <td className="p-2">{l?.rating ?? "N/A"}</td>
                <td className="p-2 flex gap-2">
                  <Link
                    href={`/leads/${l.id}`}
                    className="px-2 py-1 bg-gray-300 rounded inline-block"
                  >
                    <button>View</button>
                  </Link>
                  <Link
                    href={`/leads/${l.id}/update`}
                    className="px-2 py-1 bg-yellow-500 text-white rounded inline-block"
                  >
                    <button>Edit</button>
                  </Link>
                  <DeleteLeadButton id={l.id} />
                </td>
              </TableRow>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
