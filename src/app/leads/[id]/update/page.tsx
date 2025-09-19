// app/leads/[id]/update/page.tsx
import { getLeadById } from "../../apis";
import UpdateLeadForm from "../../_components/UpdateLeadForm";
import { notFound } from "next/navigation";

export default async function UpdateLeadPage({ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const lead = await getLeadById(id);
    if (!lead) return notFound();

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Update Lead</h1>
        <UpdateLeadForm lead={lead} />
      </div>
    );
  } catch (e) {
    return (
      <div className="p-6 text-red-500">
        Failed to load lead detail. Please try again later.
      </div>
    );
  }
}
