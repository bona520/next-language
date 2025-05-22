import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { CookieName } from './app/enum';

const SECRET = process.env.SECRET_KEY;
const defaultLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE === 'en' ? 'en' : 'km';

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

const intlMiddleware = createMiddleware({
    locales: ['km', 'en'],
    defaultLocale,
    localePrefix: 'as-needed',
});

export async function middleware(req: NextRequest) {
    const userCookie = req.cookies.get(CookieName.USER);

    // Not logged in
    if (!userCookie?.value) {
        return isLoginPath(req.nextUrl.pathname)
            ? intlMiddleware(req)
            : redirectToLogin(req);
    }

    // Validate cookie
    const user = await validateUserCookie(userCookie.value as string);
    if (!user) {
        const res = redirectToLogin(req);
        res.cookies.set(CookieName.USER, '', { maxAge: 0 });
        return res;
    }

    // Already logged in, prevent access to /login
    if (isLoginPath(req.nextUrl.pathname)) {
        return redirectToHome(req);
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