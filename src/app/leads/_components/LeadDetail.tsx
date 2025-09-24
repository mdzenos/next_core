"use client";

import Link from "next/link";
import { Lead } from "../schemas";

export default function LeadDetail({ lead }: { lead: Lead }) {
	return (
		<article>
			<h2>{lead.title}</h2>
			<p>{lead.description}</p>
			<Link href={`/leads/${lead.id}/update`}>Edit</Link>
		</article>
	);
}
