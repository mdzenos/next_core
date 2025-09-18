// app/leads/create/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createLeadAction } from "../actions";
import { LeadInput, validateAndCheckChanges } from "../schemas";

export default function CreateLeadPage() {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [owner, setOwner] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (
    e: React.FormEvent,
    intent: "create" | "createAndNew",
    original?: LeadInput
  ) => {
    e.preventDefault();

    // chuẩn bị input từ form
    const input: LeadInput = { name, email, status: "new", owner };

    // dữ liệu fake nếu CREATE
    const originalData: LeadInput = original ?? { name: "", email: "", status: "", owner: "" };

    // Validate + check unchanged (CREATE sẽ luôn có thay đổi vì original fake)
    const result = validateAndCheckChanges(input, originalData);
    if (!result.ok) {
      setErrors(result.errors);
      return; // dừng submit
    }

    const res = await createLeadAction(result.data);
    if (!res.ok) {
      setErrors(res.errors ?? {});
      return;
    }

    if (intent === "create") {
      // chuyển sang trang chi tiết
      router.push(`/leads/${res.lead.id}`);
    } else {
      // reset form cho Create & New
      setName("");
      setEmail("");
      setOwner("");
      setStatus("");
      setErrors({});
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Lead</h1>

      <form className="space-y-4">
        <div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="border p-2 w-full"
          />
          {errors.name && <p className="text-red-500">{errors.name.join(", ")}</p>}
        </div>

        <div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border p-2 w-full"
          />
          {errors.email && <p className="text-red-500">{errors.email.join(", ")}</p>}
        </div>

        <div>
          <input
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            placeholder="Owner"
            className="border p-2 w-full"
          />
          {errors.owner && <p className="text-red-500">{errors.owner.join(", ")}</p>}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-3 py-1 bg-green-500 text-white rounded"
            onClick={(e) => handleSubmit(e, "create")}
          >
            Create
          </button>

          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={(e) => handleSubmit(e, "createAndNew")}
          >
            Create & New
          </button>
        </div>
      </form>
    </div>
  );
}
