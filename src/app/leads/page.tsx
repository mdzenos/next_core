"use client";

import { useEffect, useState } from "react";
import { leadsApi } from "./api";
import LeadDetail from "./_components/LeadDetail";
import { Lead } from "./schemas";

interface LeadPageProps {
  params: { id: string };
}

export default function LeadPage({ params }: LeadPageProps) {
  const { id } = params;
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    leadsApi
      .getOne(id)
      .then((data) => {
        setLead(data);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load lead");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error || !lead) return <p>{error ?? "Lead not found"}</p>;

  return <LeadDetail lead={lead} />;
}
