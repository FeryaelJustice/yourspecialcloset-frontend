"use client";

import { useTranslations } from "next-intl";

export default function TermsPage() {
    const t = useTranslations("terms");

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
            <p className="mb-8">{t("intro")}</p>

            {/* Secciones */}
            {["general", "websiteUse", "pricingAndShipping", "paymentMethods", "customerService", "modifications"].map(
                (section) => (
                    <div key={section} className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">{t(`sections.${section}.title`)}</h2>
                        {Array.isArray(t.raw(`sections.${section}.content`)) ? (
                            <ul className="list-disc list-inside space-y-2">
                                {t.raw(`sections.${section}.content`).map((item: string, index: number) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>{t(`sections.${section}.content`)}</p>
                        )}
                    </div>
                )
            )}
        </div>
    );
}
