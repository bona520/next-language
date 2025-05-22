"use client";

import { useTranslations } from "next-intl";

export default function UserPage() {
    const t = useTranslations();
    return (
        <div>
            <h1>{t("user")}</h1>
            <p>{t("description")}</p>
        </div>
    );
}