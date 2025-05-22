"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter();

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

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="">
                {t("name")}
            </div>
            <div className="flex space-x-4">
                <button onClick={() => changeLanguage("en")}>English</button>
                <button onClick={() => changeLanguage("km")}>ភាសាខ្មែរ</button>
            </div>
        </nav>
    );
}