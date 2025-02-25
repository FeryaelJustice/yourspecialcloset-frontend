"use client"; // Necesario para usar `useEffect` en Next.js

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";

import { Product } from "@/types/product";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4001"; // ✅ Usa variables de entorno

interface CarouselProps {
    products: Product[];
}

const Carousel = ({ products }: CarouselProps) => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]} // ✅ Se agregaron módulos para mejor navegación
            spaceBetween={50}
            slidesPerView={1}
            navigation // ✅ Habilita navegación con flechas
            pagination={{ clickable: true }} // ✅ Indicadores de paginación clicables
            scrollbar={{ draggable: true }} // ✅ Permite arrastrar el scrollbar
            loop={true} // ✅ Loop infinito
            className="mySwiper"
        >
            {products.map((product) => (
                <SwiperSlide key={product.id}>
                    <div style={{ position: "relative", width: "100%", height: "400px" }}> {/* ✅ Mantener relación de aspecto */}
                        <Image
                            src={`${SERVER_URL}/${product.media[0].file_url}`}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            priority // ✅ Carga más rápido la imagen principal
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
