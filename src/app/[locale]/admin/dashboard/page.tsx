"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';
import { getProducts, deleteProduct, verifyToken } from "@/services/api";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { VerifyToken } from "@/types/verifyToken";
import { toast } from "nextjs-toast-notify";
import AdminProductModal from "@/components/AdminProductModal";

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:4001";

export default function Dashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const router = useRouter();

    // ✅ Obtener productos desde la API
    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data);
        } catch (err) {
            console.error("Error fetching products:", err);
            toast.error("Error fetching products");
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (!token) {
                router.push("/");
                return;
            }

            try {
                const res: VerifyToken = await verifyToken(token);
                if (!res.valid) {
                    localStorage.removeItem("adminToken");
                    router.push("/");
                    return;
                }

                await fetchProducts();
            } catch (err) {
                console.error("Error verifying token:", err);
                toast.error("Error verifying token");
                router.push("/");
            }
        };

        checkAuth();
    }, [router]);

    // ✅ Eliminar un producto
    const handleDelete = async (id: number) => {
        const token = localStorage.getItem("adminToken");
        if (!token) return alert("Unauthorized");

        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await deleteProduct(id, token);
            await fetchProducts();
            toast.success("Product deleted successfully");
        } catch (err) {
            toast.error("Error deleting product: " + err);
        }
    };

    // ✅ Abrir modal para editar o crear un producto
    const openModal = (product: Product | null = null) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    // ✅ Cerrar modal
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentProduct(null);
    };

    // ✅ Actualizar lista de productos
    const updateProductList = async () => {
        await fetchProducts(); // ✅ Recargar la lista de productos desde la API
        closeModal();
    };

    return (
        <div className="min-h-screen mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Admin Panel</h2>
                <button
                    onClick={() => openModal()}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                >
                    Add Product
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 text-left">Image</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">
                                    <td className="py-2 px-4">
                                        {product.media?.[0]?.file_url ? (
                                            <Image
                                                src={`${SERVER_URL}/${product.media[0].file_url}`}
                                                alt={product.name || "Product Image"}
                                                width={64}
                                                height={64}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-2 px-4">{product.name || "N/A"}</td>
                                    <td className="py-2 px-4">{product.category?.name || "N/A"}</td>
                                    <td className="py-2 px-4">${product.price || "0.00"}</td>
                                    <td className="py-2 px-4 space-x-2">
                                        <button
                                            onClick={() => openModal(product)}
                                            className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-4 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Reusable Modal */}
            {isModalOpen && (
                <AdminProductModal
                    product={currentProduct}
                    onClose={closeModal}
                    onProductSaved={updateProductList}
                />
            )}
        </div>
    );
}
