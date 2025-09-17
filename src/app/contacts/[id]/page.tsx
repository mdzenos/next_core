import { db } from '@/lib/db';
export default async function ContactDetail({ params }) {
  const contact = await db.findById('contacts', params.id);
  if (!contact) return <div className="p-6">Contact not found</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{contact.firstName} {contact.lastName}</h1>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
    </div>
  );
}
