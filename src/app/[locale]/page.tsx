import Image from 'next/image';
import { getProducts } from "@/services/api";
import { Product } from '@/types/product';
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
    let products: Product[] = [];

    try {
        products = await getProducts();
        console.log('Productos:', products);
        console.log('Product sizes: ', products[0].sizes);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }

    return (
        <div className="relative w-full h-full">
            {/* Hero Section */}
            <section className="relative w-full h-[500px]">
                <Image
                    src="/logo.png"
                    alt="Destaca del resto"
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                    <h2 className="text-4xl font-bold">DESTACA DEL RESTO.</h2>
                    <p className="mt-2">-10% ADICIONAL CON EL CÓDIGO: EXTRA10</p>
                </div>
            </section>

            {/* Carousel Section */}
            <section className="p-8">
                {products.length > 0 ? (
                    <ProductGrid products={products} />
                ) : (
                    <p>No hay productos disponibles.</p>
                )}
            </section>

            {/* Trustpilot Section */}
            <section className="p-8 flex justify-center items-center">
                <Image src="/trustpilot_yourspecialcloset.webp" alt='Trustpilot' width={1800} height={20} />
            </section>

            {/* Footer Section */}
        </div>
    );
}
