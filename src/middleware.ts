import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { COOKIE_NAME } from './enum';

const SECRET = process.env.SECRET_KEY;

async function validateUserCookie(token: string) {
    if (!SECRET) throw new Error('SECRET_KEY is not defined');
    try {
        const { secret, ...userData } = JSON.parse(token);
        return secret === SECRET ? userData : null;
    } catch {
        return null;
    }
}

function redirectToLogin(req: NextRequest) {
    return NextResponse.redirect(new URL('/login', req.url));
}

function redirectToHome(req: NextRequest) {
    return NextResponse.redirect(new URL('/', req.url));
}

function isLoginPath(pathname: string) {
    // Matches /login, /en/login, /km/login
    return /^\/(login|en\/login|km\/login)$/.test(pathname);
}


export async function middleware(req: NextRequest) {
    const userCookie = req.cookies.get(COOKIE_NAME.USER);
    const cookieLocale = req.cookies.get(COOKIE_NAME.LANGUAGE)?.value;

    const envDefaultLocale =
        process.env.NEXT_PUBLIC_DEFAULT_LOCALE === 'en' ? 'en' : 'km';

    const defaultLocale: 'km' | 'en' = cookieLocale === 'en' || cookieLocale === 'km'
        ? cookieLocale
        : envDefaultLocale;

    const intlMiddleware = createMiddleware({
        locales: ['km', 'en'],
        defaultLocale: defaultLocale,
        localePrefix: 'as-needed',
        localeDetection: false,
        localeCookie: {
            maxAge: 365 * 24 * 60 * 60 * 1000
        }
    });
    // Not logged in
    if (!userCookie?.value) {
        if (isLoginPath(req.nextUrl.pathname)) {
            // Only set NEXT_LOCALE cookie if not present AND no locale in path
            const nextLocaleCookie = req.cookies.get(COOKIE_NAME.LANGUAGE);
            const isRootOrNoLocale =
                !/^\/(en|km)(\/|$)/.test(req.nextUrl.pathname);
            if (!nextLocaleCookie && isRootOrNoLocale) {
                const res = intlMiddleware(req);
                const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
                res.headers.append(
                    'Set-Cookie',
                    `${COOKIE_NAME.LANGUAGE}=${defaultLocale}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`
                );
                return res;
            }
            return intlMiddleware(req);
        }
        return redirectToLogin(req);
    }

    // Validate cookie
    const user = await validateUserCookie(userCookie.value as string);
    if (!user) {
        const res = redirectToLogin(req);
        res.cookies.set(COOKIE_NAME.USER, '', { maxAge: 0 });
        return res;
    }

    // Already logged in, prevent access to /login
    if (isLoginPath(req.nextUrl.pathname)) {
        return redirectToHome(req);
    }

    // Only set NEXT_LOCALE cookie if not present AND no locale in path
    const nextLocaleCookie = req.cookies.get(COOKIE_NAME.LANGUAGE);
    const isRootOrNoLocale = !/^\/(en|km)(\/|$)/.test(req.nextUrl.pathname);
    if (!nextLocaleCookie && isRootOrNoLocale) {
        const res = intlMiddleware(req);
        const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
        res.headers.append(
            'Set-Cookie',
            `${COOKIE_NAME.LANGUAGE}=${defaultLocale}; Path=/; HttpOnly; SameSite=Lax; Expires=${expires}`
        );
        return res;
    }

    // Pass to next-intl middleware for i18n routing
    return intlMiddleware(req);
}

export const config = {
    matcher: [
        // Auth + i18n for all pages except static/image/api
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};