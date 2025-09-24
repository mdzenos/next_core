import { getLead } from "../../api";
import LeadForm from "../../_components/LeadForm";

type Props = { params: { id: string } };

export default async function UpdateLeadPage({ params }: Props) {
  const lead = await getLead(Number(params.id));
  return (
    <main>
      <h1>Edit Lead</h1>
      <LeadForm mode="update" lead={lead} />
    </main>
  );
}
