"use client";

import { useTranslations } from 'next-intl';

export default function LoginPage() {
    const t = useTranslations();

    return (
        <div>
            <h1>{t('login')}</h1>
            <p>{t('password')}</p>
        </div>
    );
}