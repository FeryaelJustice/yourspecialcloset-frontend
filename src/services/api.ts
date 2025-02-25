import axios from "axios";
import { Product } from "@/types/product";
import { ProductCategory } from "@/types/productCategory";
import { VerifyToken } from "@/types/verifyToken";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/api"; // ✅ Usa variables de entorno

export const getProducts = async (): Promise<Product[]> => {
    try {
        console.log(`Fetching products from: ${API_URL}/products`); // ✅ Debug URL de la API
        const response = await axios.get<Product[]>(`${API_URL}/products`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error al obtener productos:", error.message);
        } else {
            console.error("Error desconocido al obtener productos:", error);
        }
        return []; // ✅ Devuelve un array vacío para evitar crasheos
    }
};

export const getProductCategories = async (): Promise<ProductCategory[]> => {
    try {
        console.log(`Fetching products from: ${API_URL}/products/categories`); // ✅ Debug URL de la API
        const response = await axios.get<ProductCategory[]>(`${API_URL}/products/categories`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error al obtener productos:", error.message);
        } else {
            console.error("Error desconocido al obtener productos:", error);
        }
        return []; // ✅ Devuelve un array vacío para evitar crasheos
    }
};

export const getProductsByCategory = async (id: number): Promise<Product[]> => {
    try {
        console.log(`Fetching products by category from: ${API_URL}/products/category/${id}`); // ✅ Debug URL de la API
        const response = await axios.get<Product[]>(`${API_URL}/products/category/${id}`);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error al obtener productos:", error.message);
        } else {
            console.error("Error desconocido al obtener productos:", error);
        }
        return []; // ✅ Devuelve un array vacío para evitar crasheos
    }
};

export const getProductDetail = async (id: number): Promise<Product | null> => {
    try {
        console.log(`Fetching product from: ${API_URL}/products/${id}`);
        const response = await axios.get<Product>(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error al obtener producto:", error.message);
        } else {
            console.error("Error desconocido al obtener producto:", error);
        }
        return null; // ✅ Devuelve un array vacío para evitar crasheos
    }
}

export const createProduct = async (formData: FormData, token: string) => {
    const response = await axios.post(`${API_URL}/products`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const updateProduct = async (id: number, formData: FormData, token: string) => {
    const response = await axios.put(`${API_URL}/products/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const deleteProduct = async (id: number, token: string) => {
    await axios.delete(`${API_URL}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const loginAdmin = async (username: string, password: string): Promise<string> => {
    const response = await axios.post(`${API_URL}/admin/login`, { username, password });
    return response.data.token;
};

export const verifyToken = async (token: string): Promise<VerifyToken> => {
    const response = await axios.post(`${API_URL}/admin/verify-token`, { token });
    return response.data;
};

