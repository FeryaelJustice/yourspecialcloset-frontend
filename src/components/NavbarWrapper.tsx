"use client"; // ✅ Este componente es del lado del cliente para usar useState

import { useState, useEffect } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface NavbarWrapperProps {
    locale: string;
    children: React.ReactNode;
}

export default function NavbarWrapper({ locale, children }: NavbarWrapperProps) {
    const [navbarHeight, setNavbarHeight] = useState(0);
    const [announcementHeight, setAnnouncementHeight] = useState(0);

    useEffect(() => {
        const announcement = document.getElementById("announcement-bar");
        const navbar = document.getElementById("navbar");
        setAnnouncementHeight(announcement?.offsetHeight || 0);
        setNavbarHeight(navbar?.offsetHeight || 0);
    }, []);

    return (
        <div>
            <AnnouncementBar />
            <Navbar locale={locale} setNavbarHeight={setNavbarHeight} announcementHeight={announcementHeight} />
            <main style={{ marginTop: navbarHeight + announcementHeight }}>{children}</main>
            <Footer />
        </div>
    );
}
