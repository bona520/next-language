'use client';

import { ProgressProvider } from '@bprogress/next/app';

interface Props {
    children: React.ReactNode;
}

export default function ProgressBarProvider({ children }: Props) {

    return (
        <ProgressProvider
            height="4px"
            color="#1a73e8"
            options={{ showSpinner: false }}
            shallowRouting
        >
            {children}
        </ProgressProvider>

    );
}