import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { createContact } from '../contacts/actions/create-contact';

export default function CreateContactPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Contact</h1>

      <form action={createContact} className="space-y-4">
        <FormField label="First Name" name="firstName" />
        <FormField label="Last Name" name="lastName" />
        <FormField label="Email" name="email" type="email" />
        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
