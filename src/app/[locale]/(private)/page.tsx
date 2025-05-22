"use client";

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
    const t = useTranslations();
    return (
        <div>
            <h1>{t('name')}</h1>
            <Link href="/about">{t('description')}eeee</Link>
        </div>
    );
}