// src/lib/composeProviders.ts
'use client';

import React from 'react';

type ProviderProps = {
	children: React.ReactNode;
};

type Provider = React.ComponentType<ProviderProps>;

export function composeProviders(providers: Provider[]): React.FC<{ children: React.ReactNode }> {
	return function ComposedProvider({ children }) {
		return providers.reduceRight((acc, Provider) => {
			return <Provider>{acc}</Provider>;
		}, children);
	};
}
