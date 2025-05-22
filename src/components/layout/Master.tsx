// import { cookies } from "next/headers";
import Navbar from "./Navbar";

export default async function MasterLayout({
    children,
    locale,
}: {
    children: React.ReactNode;
    locale: string;
}) {
    // Get THEME cookie value, fallback to NEXT_PUBLIC_DEFAULT_THEME if null
    // const themeCookie = (await cookies()).get("THEME")?.value;
    // const defaultTheme = process.env.NEXT_PUBLIC_DEFAULT_THEME as ThemeSetting | undefined;
    // const theme = (themeCookie as ThemeSetting | undefined) ?? defaultTheme ?? "light";

    return (
        <>
            <Navbar locale={locale} />
            {children}
        </>
    );
}