// src/lib/helpers/toast.tsx
import { toast, ToastOptions } from 'react-hot-toast';
import React, { useEffect, useRef, useState } from 'react';

type ToastType = 'success' | 'error' | 'loading' | 'custom';

const MAX_TOASTS = 5;
let toastQueue: string[] = [];

const DEFAULT_TOAST_OPTIONS: ToastOptions = {
	duration: 2500,
	style: {
		minWidth: '200px',
		maxWidth: '350px',
		fontSize: '14px',
	},
};

const toastColors: Record<ToastType, string> = {
	success: '#22c55e',
	error: '#ef4444',
	loading: '#3b82f6',
	custom: '#6b7280',
};


const toastBgColors: Record<ToastType, string> = {
	success: '#d1fae5',
	error: '#fee2e2',
	loading: '#dbeafe',
	custom: '#f3f4f6',
};

function ToastWithClose({
	id,
	message,
	type,
	duration,
}: {
	id: string;
	message: string;
	type: ToastType;
	duration: number; // duration toast đóng
}) {
	const progressDuration = duration + 750; // progress chạy dài hơn 150ms
	const [progress, setProgress] = useState(100);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (duration === 999999) return; // loading toast skip progress bar

		const start = Date.now();

		intervalRef.current = setInterval(() => {
			const elapsed = Date.now() - start;
			const percentLeft = Math.max(0, 100 - (elapsed / progressDuration) * 100);
			setProgress(percentLeft);
			if (percentLeft <= 0 && intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		}, 50);

		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [duration, progressDuration]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '12px 16px',
				borderLeft: `5px solid ${toastColors[type]}`,
				backgroundColor: toastBgColors[type],
				borderRadius: 6,
				boxShadow: '0 2px 6px rgb(0 0 0 / 0.1)',
				minWidth: 280,
				maxWidth: 400,
				fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
				fontSize: 14,
				color: '#111',
				position: 'relative',
			}}
			role="alert"
			aria-live="assertive"
		>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
				<div style={{ flex: 1, marginRight: 12 }}>{message}</div>
				<button
					onClick={() => toast.dismiss(id)}
					aria-label="Close toast"
					style={{
						border: 'none',
						background: 'transparent',
						cursor: 'pointer',
						fontWeight: 'bold',
						fontSize: 20,
						lineHeight: 1,
						color: toastColors[type],
						padding: 0,
						userSelect: 'none',
						transition: 'color 0.2s ease',
					}}
					onMouseEnter={(e) => (e.currentTarget.style.color = '#000')}
					onMouseLeave={(e) => (e.currentTarget.style.color = toastColors[type])}
				>
					×
				</button>
			</div>

			{duration !== 999999 && (
				<div
					aria-hidden="true"
					style={{
						position: 'relative',
						height: 4,
						backgroundColor: '#e0e0e0',
						borderRadius: 2,
						overflow: 'hidden',
						marginTop: 4,
					}}
				>
					<div
						style={{
							width: `${progress}%`,
							height: '100%',
							backgroundColor: toastColors[type],
							transition: 'width 50ms linear',
						}}
					/>
				</div>
			)}
		</div>
	);
}

function appToast(
	message: string,
	type: ToastType,
	options?: ToastOptions
): void {
	const duration =
		type === 'loading' ? 999999 : options?.duration ?? DEFAULT_TOAST_OPTIONS.duration;

	const style = {
		...DEFAULT_TOAST_OPTIONS.style,
		...options?.style,
	};

	const mergedOptions: ToastOptions = {
		...DEFAULT_TOAST_OPTIONS,
		...options,
		duration,
		style,
	};

	const id = toast.custom(
		(t) => <ToastWithClose id={t.id} message={message} type={type} duration={duration} />,
		mergedOptions
	);

	toastQueue.push(id);

	if (toastQueue.length > MAX_TOASTS) {
		const oldId = toastQueue.shift();
		if (oldId) toast.dismiss(oldId);
	}
}

export function successToast(message: string, options?: ToastOptions) {
	appToast(message, 'success', options);
}

export function errorToast(message: string, options?: ToastOptions) {
	appToast(message, 'error', options);
}

export function loadingToast(message: string, options?: ToastOptions) {
	appToast(message, 'loading', options);
}

export function customToast(message: string, options?: ToastOptions) {
	appToast(message, 'custom', options);
}
