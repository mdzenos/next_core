// app/leads/actions.tsx
'use client';

import { deleteLead } from "./apis";

export function DeleteLeadButton({ id }: { id: string }) {
	const handleDelete = async () => {
		const ok = confirm("Bạn có chắc muốn xóa lead này?");
		if (!ok) return;

		try {
			const data = await deleteLead(id);

			if (data.isDeleted) {
				// reload lại list sau khi xóa
				window.location.reload();
			} else {
				alert("Xóa thất bại: " + (data.error || "Unknown error"));
			}
		} catch (err) {
			alert("Có lỗi xảy ra khi xóa");
			console.error(err);
		}
	};

	return (
		<button
			onClick={handleDelete}
			className="px-2 py-1 bg-red-500 text-white rounded"
		>
			Delete
		</button>
	);
}
