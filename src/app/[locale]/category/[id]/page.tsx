"use client";

import { useEffect, useState } from 'react';
import { getProductCategories, getProductsByCategory } from "@/services/api";
import { ProductCategory } from '@/types/productCategory';
import { Product } from '@/types/product';
import ProductGrid from "@/components/ProductGrid";
import Image from "next/image";
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4001";

export default function CategoryPage() {
    const currentLocale = useLocale();
    const params = useParams();

    const [currentCategory, setCurrentCategory] = useState<ProductCategory | undefined>(undefined);
    const [products, setProducts] = useState<Product[] | Product>([]);

    useEffect(() => {
        const fetchData = async () => {
            const productID = Number(params.id);
            if (isNaN(productID)) return;

            try {
                const productCategories = await getProductCategories();
                const category = productCategories.find((category) => category.id === productID);

                if (!category) return;

                setCurrentCategory(category);

                const fetchedProducts = await getProductsByCategory(productID);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetchData();
    }, [params.id]);

    return (
        <div className="relative w-full h-full mx-auto py-8">
            <section className="p-8 text-center">
                <h2 className="text-4xl font-bold mb-4">
                    {currentLocale === 'en' ? currentCategory?.name_en : currentCategory?.name}
                </h2>
            </section>

            <section className="p-8">
                {Array.isArray(products) ? (
                    products.length === 1 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <div className="text-center border rounded-lg overflow-hidden shadow-lg">
                                <div className="relative w-full h-80">
                                    <Image
                                        src={`${SERVER_URL}/${products[0].media?.[0]?.file_url}`}
                                        alt={products[0].name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className='cursor-pointer'
                                        priority
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold truncate" title={products[0].name}>{products[0].name}</h3>
                                    <p className="text-gray-600">{products[0].price} EUR</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ProductGrid products={products} />
                    )
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="w-[620px] text-center border rounded-lg overflow-hidden shadow-lg">
                            <div className="relative w-full h-80">
                                <Image
                                    src={`${SERVER_URL}/${(products as Product).media?.[0]?.file_url}`}
                                    alt={(products as Product).name}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className='cursor-pointer'
                                    priority
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-lg font-semibold truncate" title={(products as Product).name}>{(products as Product).name}</h3>
                                <p className="text-gray-600">{(products as Product).price} EUR</p>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
}
