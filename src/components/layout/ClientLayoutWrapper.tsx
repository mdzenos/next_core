// src/components/layout/ClientLayoutWrapper.tsx
'use client';

import { ErrorBoundary } from './ErrorBoundary';
import { Providers as ReduxProvider } from './ReduxProvider';
import { composeProviders } from '@lib/composeProviders';
import { Toaster } from 'react-hot-toast'

// ⚠️ Bạn có thể thêm các Provider khác vào đây nếu muốn mở rộng
const AppProviders = composeProviders([
	ErrorBoundary,
	ReduxProvider,
]);

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
	return <>
		<Toaster position="top-right" />
		<AppProviders>
			{children}
		</AppProviders>
	</>
		;
}
