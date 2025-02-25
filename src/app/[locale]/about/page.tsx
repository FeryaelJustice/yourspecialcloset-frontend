import { useTranslations } from 'next-intl';

export default function About() {
    const t = useTranslations('about');

    return (
        <div className="container min-h-screen mx-auto py-12 flex flex-col items-center text-justify">
            <h1 className='text-3xl font-bold'>{t('title')}</h1>
            <div className='text-justify pt-4'>
                <p>{t('welcome')} <strong>Your Special Closet</strong>, {t('tagline')}</p>
                <p>{t('mission')}</p>
                <p>{t('variety')} <strong>Your Special Closet</strong> {t('commitment')}</p>

                <h2 className='text-2xl pt-2'>{t('historyTitle')}</h2>
                <p>{t('historyText')}</p>

                <h2 className='text-2xl pt-2'>{t('contactTitle')}</h2>
                <p>{t('emailLabel')}: <a href='mailto:contacto@yourspecialcloset.com'>contacto@yourspecialcloset.com</a></p>
                <p>{t('phoneLabel')}: <a href='tel:+34123456789'>+34 123 456 789</a></p>
            </div>
        </div>
    );
}