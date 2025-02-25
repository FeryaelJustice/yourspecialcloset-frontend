import { Link } from '@/i18n/routing';
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations('footer');
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="bg-black text-white py-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {/* Columna de Políticas */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">{t('policies.title')}</h3>
                    <ul className="space-y-2">
                        <li><Link href="/terms" className="hover:text-gray-400">{t('policies.terms')}</Link></li>
                        <li><Link href="/privacy" className="hover:text-gray-400">{t('policies.privacy')}</Link></li>
                        <li><Link href="/contact" className="hover:text-gray-400">{t('policies.contact')}</Link></li>
                    </ul>
                </div>

                {/* Columna de Sobre Nosotros */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">{t('about.title')}</h3>
                    <p className="text-gray-300">
                        <strong className='italic text-orange-300'>{t('title')}</strong>{t('about.description')}
                    </p>
                </div>
            </div>

            {/* Línea divisoria */}
            <div className="border-t border-gray-700 mt-8"></div>

            {/* Copyright */}
            <div className="text-center text-gray-400 text-sm mt-4">
                {t('copyright')} {year} {t('title')}
            </div>
        </footer>
    );
}