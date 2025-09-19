// app/leads/[id]/page.tsx
// app/leads/[id]/page.tsx
import Link from "next/link";
import { getLeadById } from "../apis";

export default async function LeadDetailPage({ params }: {
  params: { id: string };
}) {
  const { id } = params;

  try {
    const lead = await getLeadById(id);

    if (!lead) {
      return <div className="p-6 text-gray-500">Lead not found</div>;
    }

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">{lead.title}</h1>
        <p>description: {lead?.description ?? "N/A"}</p>
        <p>rating: {lead?.rating ?? "N/A"}</p>

        <div className="mt-4 flex gap-2">
          <Link href={`/leads/${id}/update`}>
            <button className="px-3 py-1 rounded bg-yellow-500 text-white">
              Edit
            </button>
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    return <div className="p-6 text-red-500">Failed to load lead</div>;
  }
}
