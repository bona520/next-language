import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Metadata, Viewport } from 'next';
import DevTool from '@/components/layout/DevTool';
import { ThemeProvider } from 'next-themes';

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: '' });
    return {
        title: {
            default: t('nextLang'),
            template: `%s - ${t('nextLang')}`,
        }
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Ensure that the incoming `locale` is valid
    const { locale } = await params;

    console.log('LocaleLayout', locale);
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <NextIntlClientProvider>
                    <DevTool>
                        <ThemeProvider
                            themes={['light', 'dark', 'system']}
                            defaultTheme={process.env.NEXT_PUBLIC_DEFAULT_THEME as 'light' | 'dark' | 'system' || 'system'}
                            enableSystem
                        >
                            {children}
                        </ThemeProvider>
                    </DevTool>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}