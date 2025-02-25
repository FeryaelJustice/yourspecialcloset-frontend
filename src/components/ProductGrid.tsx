"use client";
import Image from "next/image";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useLocale } from 'next-intl';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4001"; // ✅ Usa variables de entorno

interface ProductGridProps {
    products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
    const router = useRouter();
    const currentLocale = useLocale();
    console.log(products);
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="text-center border rounded-lg overflow-hidden shadow-lg" onClick={() => router.push(`${currentLocale}/product/${product.id}`)}>
                    <div className="relative w-full h-80">
                        <Image
                            src={`${SERVER_URL}/${product.media[0].file_url}`}
                            alt={product.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="cursor-pointer"
                            priority
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold truncate" title={product.name}>{product.name}</h3>
                        <p className="text-gray-600">{product.price} EUR</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;