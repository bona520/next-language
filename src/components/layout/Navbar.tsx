"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
    locale: string;
}
export default function Navbar({ locale }: NavbarProps) {
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme()

    // Change language and keep current path
    function changeLanguage(lang: "en" | "km") {
        // Remove existing locale from path if present
        const segments = pathname.split("/");
        if (segments[1] === "en" || segments[1] === "km") {
            segments[1] = lang;
        } else {
            segments.splice(1, 0, lang);
        }
        const newPath = segments.join("/") || "/";
        router.push(newPath);
    }

    console.log("Navbar", locale);

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="">
                {t("name")}
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center">
                <Link href={`/contact`} className="p-2 hover:bg-gray-700 rounded-md">
                    {t("contact")}
                </Link>
                <Link href={`/user`} className="p-2 hover:bg-gray-700 rounded-md">
                    {t("user")}
                </Link>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                    {theme === 'light' ? '🌞 Light' : theme === 'dark' ? '🌙 Dark' : '🖥️ System'}
                </button>
                <button
                    onClick={() => changeLanguage("en")}
                    className={locale === "en" ? "font-bold text-green-400" : ""}
                >English</button>
                <button
                    onClick={() => changeLanguage("km")}
                    className={locale === "km" ? "font-bold text-green-400" : ""}
                >ភាសាខ្មែរ</button>
            </div>
        </nav>
    );
}