"use client";

export default function Error({ error }: { error: Error }) {
	return (
		<div>
			<h2>Failed to load lead detail</h2>
			<p>{error.message}</p>
		</div>
	);
}
