"use client";

import { useEffect, useRef } from "react";

const announcements = [
    "⭐ MÁS DE 100.000 CLIENTES SATISFECHOS",
    "• HASTA -65% EN TODA LA WEB",
    "• OFERTA LIMITADA EN TIEMPO ⏳",
    "• ENVÍO EXPRESS GRATIS",
    "• ÚNETE A MÁS DE 100.000 CLIENTES SATISFECHOS ⭐",
    "• HASTA -65% EN TODA LA WEB"
];

export default function AnnouncementBar() {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        if (!scrollElement) return;

        let animationFrame: number;

        const scroll = () => {
            scrollElement.scrollLeft += 1; // Velocidad del scroll
            if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
                scrollElement.scrollLeft = 0; // Reiniciar para efecto infinito
            }
            animationFrame = requestAnimationFrame(scroll);
        };

        animationFrame = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrame); // Limpiar para evitar fugas
    }, []);

    return (
        <div id="announcement-bar" className="fixed top-0 left-0 w-full bg-black text-white text-sm py-2 z-50 overflow-hidden">
            <div
                ref={scrollRef}
                className="whitespace-nowrap overflow-hidden flex"
                style={{ willChange: "transform", animation: "none" }}
            >
                <div className="flex space-x-8" style={{ minWidth: "200%", animation: "none" }}>
                    {announcements.map((text, index) => (
                        <span key={index} className="inline-block px-4">
                            {text}
                        </span>
                    ))}
                    {/* Duplicamos para efecto infinito */}
                    {announcements.map((text, index) => (
                        <span key={`dup-${index}`} className="inline-block px-4">
                            {text}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
