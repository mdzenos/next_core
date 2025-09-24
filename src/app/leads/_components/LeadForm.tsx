"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLead, updateLead } from "../api";
import { Lead } from "../schemas";

type Props = {
  mode: "create" | "update";
  lead?: Lead;
};

export default function LeadForm({ mode, lead }: Props) {
  const [title, setTitle] = useState(lead?.title ?? "");
  const [description, setDescription] = useState(lead?.description ?? "");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "create") {
      await createLead({ title, description });
    } else if (mode === "update" && lead) {
      await updateLead(lead.id, { title, description });
    }

    router.push("/leads");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit">
        {mode === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
}
