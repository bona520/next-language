"use client"


import { useTranslations } from "next-intl";

export default function ContactPage() {
    const t = useTranslations();
    return (
        <div>
            <h1 className="text-white dark:text-red-500">{t("contact")}</h1>
            <p>{t("description")}</p>
            <div className="p-3 rounded-md bg-green-400 dark:bg-blue-400 mt-4"></div>
        </div>
    );
}