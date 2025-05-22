import { defineRouting } from 'next-intl/routing';

const defaultLocale =
    process.env.NEXT_PUBLIC_DEFAULT_LOCALE === 'en' ? 'en' : 'km';

export const routing = defineRouting({
    locales: ['km', 'en'],
    defaultLocale,
    localeCookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000
    }
});