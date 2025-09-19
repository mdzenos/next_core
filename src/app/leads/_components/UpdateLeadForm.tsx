"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateLead } from "../apis";
import { LeadInput, validateAndCheckChanges } from "../schemas";
import { Lead } from "@/types";

export default function UpdateLeadForm({ lead }: { lead: Lead }) {
	const router = useRouter();
	const [errors, setErrors] = useState<Record<string, string[]>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// form state
	const [form, setForm] = useState<LeadInput>({
		title: lead.title ?? "",
		description: lead.description ?? "",
		rating: lead.rating ?? "",
	});

	const handleChange =
		(field: keyof LeadInput) =>
		(e: React.ChangeEvent<HTMLInputElement>) =>
			setForm({ ...form, [field]: e.target.value });

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		const result = validateAndCheckChanges(form, lead);
		if (!result.ok) {
			setErrors(result.errors);
			setIsSubmitting(false);
			return;
		}

		try {
			await updateLead(lead.id, result.data);
			router.push("/leads");
		} catch (err: any) {
			setErrors({ _update: [err.message || "Update failed"] });
		} finally {
			setIsSubmitting(false);
		}
	};

	const renderInput = (field: keyof LeadInput, placeholder: string) => (
		<div>
			<input
				value={form[field] ?? ""}
				onChange={handleChange(field)}
				placeholder={placeholder}
				className="border p-2 w-full"
			/>
			{errors[field]?.map((err, i) => (
				<p key={i} className="text-red-500 text-sm" >
					{err}
				</p>
			))}
		</div>
	);

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
			{errors._update && (
				<p className="text-red-500 text-sm mb-2">{errors._update.join(", ")}</p>
			)}

			{renderInput("title", "Title")}
			{renderInput("description", "Description")}
			{renderInput("rating", "Rating")}

			<button
				type="submit"
				disabled={isSubmitting}
				className="px-3 py-1 rounded bg-green-500 text-white disabled:opacity-50"
			>
				{isSubmitting ? "Saving..." : "Save"}
			</button>
		</form>
	);
}
