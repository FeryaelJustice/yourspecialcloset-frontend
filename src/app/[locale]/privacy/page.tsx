"use client";

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
    const t = useTranslations('privacy');
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = `${day}-${month}-${year}`;

    return (
        <div className="container mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('section1.title')}</h2>
                    <p>{currentDate}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('section2.title')}</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>{t('section2.point1')}</li>
                        <li>{t('section2.point2')}</li>
                        <li>{t('section2.point3')}</li>
                        <li>{t('section2.point4')}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('section3.title')}</h2>
                    <p>{t('section3.content')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('section4.title')}</h2>
                    <p>{t('section4.content')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('section5.title')}</h2>
                    <p>{t('section5.content')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('section6.title')}</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>{t('section6.right1')}</li>
                        <li>{t('section6.right2')}</li>
                        <li>{t('section6.right3')}</li>
                        <li>{t('section6.right4')}</li>
                        <li>{t('section6.right5')}</li>
                        <li>{t('section6.right6')}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('section7.title')}</h2>
                    <p>{t('section7.content')}</p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">{t('contact.title')}</h2>
                    <p>{t('contact.content')}</p>
                </section>
            </div>
        </div>
    );
}
