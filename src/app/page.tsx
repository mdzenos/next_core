import Link from 'next/link';
export default function CrmIndex() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">CRM Dashboard</h1>
      <p className="mt-2 text-gray-600">Quick links: Leads / Contacts / Accounts</p>
      <aside className="w-60 border-r p-4 bg-white">
        <h2 className="font-bold mb-4">CRM</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/leads">Leads</Link>
          <Link href="/contacts">Contacts</Link>
          <Link href="/accounts">Accounts</Link>
        </nav>
      </aside>
    </div>
  );
}
