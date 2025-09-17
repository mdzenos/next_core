import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { createAccount } from '../accounts/actions/create-account';

export default function CreateAccountPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Account</h1>

      <form action={createAccount} className="space-y-4">
        <FormField label="Name" name="name" />
        <FormField label="Industry" name="industry" />
        <FormField label="Website" name="website" />
        <div>
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}
