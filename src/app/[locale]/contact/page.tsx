"use client";

import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('contact');

    return (
        <div className="container min-h-screen mx-auto py-12 px-6">
            <h1 className="text-4xl font-bold mb-6">{t('title')}</h1>
            <div className="space-y-6">
                <section>
                    <p className="text-lg mb-4">{t('content')}</p>
                    <div className="space-y-2">
                        <p>
                            <strong>{t('email.label')}:</strong>{' '}
                            <a href="mailto:info.yourspecialcloset@gmail.com" className="text-blue-600 hover:underline">
                                info.yourspecialcloset@gmail.com
                            </a>
                        </p>
                        <p>
                            <strong>{t('whatsapp.label')}:</strong>{' '}
                            <a href="https://wa.me/34600000000" target="_blank" className="text-blue-600 hover:underline">
                                +34 600 000 000
                            </a>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
