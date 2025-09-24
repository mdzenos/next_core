"use client";

import Link from "next/link";
import { Lead } from "../schemas";

type Props = { leads: Lead[] };

export default function LeadList({ leads }: Props) {
  if (leads.length === 0) return <p>No leads found</p>;

  return (
    <ul>
      {leads.map((lead) => (
        <li key={lead.id}>
          <Link href={`/leads/${lead.id}`}>{lead.title}</Link>
        </li>
      ))}
    </ul>
  );
}
