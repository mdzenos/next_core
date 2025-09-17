import { db } from '@/lib/db';
export default async function AccountDetail({ params }) {
  const account = await db.findById('accounts', params.id);
  if (!account) return <div className="p-6">Account not found</div>;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{account.name}</h1>
      <p>Industry: {account.industry}</p>
      <p>Website: <a href={account.website} target="_blank" rel="noreferrer">{account.website}</a></p>
    </div>
  );
}
