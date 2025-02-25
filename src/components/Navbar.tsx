"use client";
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { getProductCategories } from '@/services/api';
import { ProductCategory } from '@/types/productCategory';

interface NavbarProps {
    locale: string;
    announcementHeight: number;
    setNavbarHeight: (height: number) => void;
}

const Navbar = ({ locale, announcementHeight, setNavbarHeight }: NavbarProps) => {
    const t = useTranslations('navbar');
    const currentLocale = useLocale();

    const pathname = usePathname();
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [categoriesOpen, setCategoriesOpen] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (navbarRef.current) {
            setNavbarHeight(navbarRef.current.offsetHeight);
        }
        const fetchCategories = async () => {
            const data = await getProductCategories();
            setCategories(data);
        };
        fetchCategories();
    }, [setNavbarHeight]);

    if (pathname.startsWith("/admin")) return null; // Ocultar navbar en admin

    const switchLanguage = (lang: string) => {
        router.push(`/${lang}${pathname.replace(/^\/(es|en)/, "")}`);
        setDropdownOpen(false);
    };

    const handleLinkClick = () => {
        setMenuOpen(false);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) setMenuOpen(false);
    };

    const handleLogoClick = () => {
        router.push("/");
    };

    return (
        <nav ref={navbarRef} id='navbar' className="navbar fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between" style={{ marginTop: announcementHeight }}>
            <button onClick={() => setMenuOpen(true)} className="text-2xl text-white">☰</button>

            <div className="flex-grow flex justify-center">
                <Link href="/">
                    <Image src="/logo_yourspecialcloset.jpg" alt="Your Special Closet" className="h-auto max-h-16 w-auto" width={120} height={60} onClick={handleLogoClick} />
                </Link>
            </div>

            <div className="flex items-center gap-4 ml-auto">
                <div className="language-selector">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                        <Image
                            src={locale === "es" ? "/es-flag.png" : "/en-flag.png"}
                            alt="Language"
                            width={30}
                            height={20}
                        />
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown w-12">
                            <button onClick={() => switchLanguage("es")}>
                                <Image src="/es-flag.png" alt="Español" width={30} height={20} />
                            </button>
                            <button onClick={() => switchLanguage("en")}>
                                <Image src="/en-flag.png" alt="English" width={30} height={20} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={handleOverlayClick}>
                    <div className="w-80 h-full bg-black text-white p-6">
                        <button onClick={() => setMenuOpen(false)} className="text-2xl mb-4">✕</button>
                        <nav className="flex flex-col gap-4">
                            <Link href="/" className="text-lg hover:text-gray-400" onClick={handleLinkClick}>{t('home')}</Link>
                            <div>
                                <button className="text-lg hover:text-gray-400" onClick={() => setCategoriesOpen(!categoriesOpen)}>
                                    {t('categories')} {categoriesOpen ? '▲' : '▼'}
                                </button>
                                {categoriesOpen && (
                                    <div className="ml-4 mt-2">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.id}
                                                href={`/category/${category.id}`}
                                                className="text-base hover:text-gray-400 block"
                                                onClick={handleLinkClick}
                                            >
                                                {currentLocale === 'en' ? category.name_en : category.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <Link href="/about" className="text-lg hover:text-gray-400" onClick={handleLinkClick}>{t('about')}</Link>
                            <Link href="/admin" className="text-lg hover:text-gray-400" onClick={handleLinkClick}>{t('admin')}</Link>
                        </nav>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
