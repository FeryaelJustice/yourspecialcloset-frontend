"use client";

import { getProductDetail } from "@/services/api";
import { Product } from "@/types/product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useTranslations } from "next-intl";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4001";

export default function ProductDetailPage() {
    const t = useTranslations("productDetail.sections");
    const params = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchData = async () => {
            const productID = Number(params.id);
            if (isNaN(productID)) return;

            try {
                const fetchedProduct = await getProductDetail(productID);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error("Error fetching product detail:", error);
            }
        };

        fetchData();
    }, [params.id]);

    const toggleSection = (section: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (!product) {
        return <p className="text-center mt-10">Cargando producto...</p>;
    }

    return (
        <div className="container mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative w-full h-[500px]">
                    {product.media && product.media.length > 1 ? (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            spaceBetween={10}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                        >
                            {product.media.map((mediaItem) => (
                                <SwiperSlide key={mediaItem.file_url}>
                                    <div className="relative w-full h-[500px]">
                                        <Image
                                            src={`${SERVER_URL}/${mediaItem.file_url}`}
                                            alt={product.name}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            fill
                                            style={{ objectFit: "cover" }}
                                            priority
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <Image
                            src={`${SERVER_URL}/${product.media?.[0]?.file_url}`}
                            alt={product.name}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            fill
                            style={{ objectFit: "cover" }}
                            priority
                        />
                    )}
                </div>

                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl font-semibold mb-4">{product.price} EUR</p>
                    <div className="flex space-x-2 mb-4">
                        {product.sizes?.map((size) => (
                            <div key={size.size} className="px-4 py-2 border rounded-lg text-center cursor-pointer">
                                {size.size}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 space-y-6">
                {["warranty", "sizeGuide", "materials", "shipping"].map((section) => (
                    <div key={section} className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                        <button
                            onClick={() => toggleSection(section)}
                            className="w-full text-left p-4 bg-gray-100 font-semibold text-lg flex justify-between items-center"
                        >
                            {t(`${section}.title`)}
                            <span>{expandedSections[section] ? "−" : "+"}</span>
                        </button>
                        {expandedSections[section] && (
                            <div className="p-4 bg-white text-gray-700">
                                {section === "warranty" && <p>{t(`${section}.description`)}</p>}
                                {section === "sizeGuide" && (
                                    <div>
                                        <p>{t(`${section}.description`)}</p>
                                        <ul className="list-disc list-inside">
                                            <li>{t(`${section}.sizes.S`)}</li>
                                            <li>{t(`${section}.sizes.M`)}</li>
                                            <li>{t(`${section}.sizes.L`)}</li>
                                            <li>{t(`${section}.sizes.XL`)}</li>
                                            <li>{t(`${section}.sizes.XXL`)}</li>
                                        </ul>
                                    </div>
                                )}
                                {section === "materials" && <p>{t(`${section}.description`)}</p>}
                                {section === "shipping" && <p>{t(`${section}.description`)}</p>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
