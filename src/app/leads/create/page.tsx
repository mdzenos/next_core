import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { createLead } from '../_actions/create-lead';

export default function CreateLeadPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Lead</h1>

      <form action={createLead} className="space-y-4">
        <FormField label="Name" name="name" />
        <FormField label="Email" name="email" type="email" />
        <FormField label="Owner" name="owner" />
        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
