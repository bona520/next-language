// import { defineRouting } from 'next-intl/routing';

// export const routing = defineRouting({
//     // A list of all locales that are supported
//     locales: ['km', 'en'],

//     // Used when no locale matches

//     defaultLocale: (process.env.NEXT_PUBLIC_DEFAULT_LOCALE === 'km' || process.env.NEXT_PUBLIC_DEFAULT_LOCALE === 'en')
//         ? process.env.NEXT_PUBLIC_DEFAULT_LOCALE as 'km' | 'en'
//         : 'km',
// });

import { defineRouting } from 'next-intl/routing';

const defaultLocale =
    process.env.NEXT_PUBLIC_DEFAULT_LOCALE === 'en' ? 'en' : 'km';

export const routing = defineRouting({
    locales: ['km', 'en'],
    defaultLocale
});