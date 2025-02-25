"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/services/api";
import { Product } from "@/types/product";
import Image from "next/image";

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
    onProductSaved: () => void;
}

export default function AdminProductModal({ product, onClose, onProductSaved }: ProductModalProps) {
    const [name, setName] = useState(product?.name || "");
    const [description, setDescription] = useState(product?.description || "");
    const [categoryName, setCategoryName] = useState(product?.category?.name || "");
    const [categoryNameEn, setCategoryNameEn] = useState(product?.category?.name_en || "");
    const [brand, setBrand] = useState(product?.brand || "");
    const [price, setPrice] = useState(product?.price || "");
    const [stock, setStock] = useState(product?.stock || 0);
    const [tags, setTags] = useState(product?.tags || "");
    const [tagError, setTagError] = useState<string | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const [sizes, setSizes] = useState<{ size: string; quantity: number }[]>([
        { size: "S", quantity: 0 },
        { size: "M", quantity: 0 },
        { size: "L", quantity: 0 },
        { size: "XL", quantity: 0 },
        { size: "XXL", quantity: 0 },
    ]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const fileList = Array.from(e.target.files);
            const validImages = fileList.filter((file) => file.type.startsWith("image/"));

            // ✅ Limitar a un máximo de 10 imágenes
            if (images.length + validImages.length > 10) {
                alert("You can upload a maximum of 10 images.");
                return;
            }

            setImages((prevImages) => [...prevImages, ...validImages]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    // ✅ Actualizar la cantidad de una talla específica
    const handleSizeChange = (index: number, value: number) => {
        const updatedSizes = [...sizes];
        updatedSizes[index].quantity = value;
        setSizes(updatedSizes);
    };

    const validateTags = (value: string) => {
        if (!/^[a-zA-Z0-9\s,]*$/.test(value)) {
            setTagError("Tags must be separated by commas and contain only letters, numbers, and spaces.");
        } else {
            setTagError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("adminToken");
        if (!token) return alert("Unauthorized");

        if (!categoryName.trim() || !categoryNameEn.trim()) {
            alert("Both category names (Spanish and English) are required.");
            return;
        }

        if (tagError) {
            alert("Please fix the tags field.");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category_name", categoryName);
        formData.append("category_name_en", categoryNameEn);
        formData.append("price", price.toString());
        formData.append("brand", brand.toString());
        formData.append("stock", stock.toString());
        formData.append("tags", tags);

        // ✅ Añadir tallas
        formData.append("sizes", JSON.stringify(sizes));

        // ✅ Añadir imágenes
        images.forEach((image) => formData.append("files", image));

        try {
            if (product) {
                await updateProduct(product.id, formData, token);
                onProductSaved();
            } else {
                await createProduct(formData, token);
                onProductSaved();
            }
            onClose();
        } catch (err) {
            alert("Error saving product: " + err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-4xl flex overflow-y-scroll max-h-[90vh]">
                {/* Formulario */}
                <div className="w-2/3 pr-6">
                    <h2 className="text-2xl font-bold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>

                        {/* ✅ Categoría */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-1">Category (Spanish)</label>
                                <input
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                    placeholder="Ej: Vestidos"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Category (English)</label>
                                <input
                                    type="text"
                                    value={categoryNameEn}
                                    onChange={(e) => setCategoryNameEn(e.target.value)}
                                    className="w-full border rounded-lg p-2"
                                    placeholder="Eg: Garments"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Brand</label>
                            <input
                                type="text"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>

                        {/* ✅ Tags */}
                        <div>
                            <label className="block mb-1">Tags (comma separated)</label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => {
                                    setTags(e.target.value);
                                    validateTags(e.target.value);
                                }}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                            {tagError && <span className="text-red-500 text-sm">{tagError}</span>}
                        </div>

                        {/* ✅ Tallas */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Sizes</h3>
                            <div className="grid grid-cols-5 gap-2">
                                {sizes.map((size, index) => (
                                    <div key={size.size} className="flex flex-col items-center">
                                        <label className="text-sm mb-1">{size.size}</label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={size.quantity}
                                            onChange={(e) => handleSizeChange(index, Number(e.target.value))}
                                            className="w-full border rounded-lg p-1 text-center"
                                            required
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1">Price</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1">Stock</label>
                            <input
                                type="number"
                                value={stock}
                                onChange={(e) => setStock(Number(e.target.value))}
                                className="w-full border rounded-lg p-2"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1">Images (max 10)</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="w-full border rounded-lg p-2"
                            />
                        </div>

                        <div className="flex justify-end space-x-2 mt-4 pb-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* ✅ Vista previa de imágenes */}
                <div className="w-1/3 border-l pl-6">
                    <h3 className="text-lg font-semibold mb-4">Image Previews</h3>
                    {images.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index}`}
                                        width={64}
                                        height={64}
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                                        title="Remove"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No images selected</p>
                    )}
                </div>
            </div>
        </div>
    );
}
