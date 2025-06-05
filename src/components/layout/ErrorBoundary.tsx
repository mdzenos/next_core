// src/components/layout/ErrorBoundary.tsx
'use client';

import React from 'react';

type Props = {
	children: React.ReactNode;
};

type State = {
	hasError: boolean;
	error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: React.ErrorInfo) {
		console.error('💥 UI crash caught by ErrorBoundary:', error, info);
		// Bạn có thể log lên server hoặc monitoring tool tại đây
	}

	render() {
		if (this.state.hasError) {
			return (
				<div style={{ padding: 20 }}>
					<h1>🧨 Có lỗi xảy ra!</h1>
					<pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.message}</pre>
				</div>
			);
		}

		return this.props.children;
	}
}
