"use client";
import { useLocale } from 'next-intl';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/services/api";

export default function AdminLogin() {
    const currentLocale = useLocale();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("adminToken");
            if (token && token != '') {
                router.push(`${getBaseUrl()}/${currentLocale}/admin/dashboard`);
                return;
            }
        };

        checkAuth();
    }, [router, currentLocale]);

    const getBaseUrl = () => {
        if (typeof window !== "undefined") {
            return window.location.origin;
        }
        return "";
    };

    const sanitizeInput = (input: string) => {
        // ✅ Elimina caracteres peligrosos y bloquea palabras clave comunes de SQL injection
        const forbiddenPatterns = /(select|insert|delete|update|drop|truncate|union|--|#|;|\*|\\)/gi;
        return input.replace(forbiddenPatterns, '').replace(/['"\\;%]/g, '');
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const sanitizedUsername = sanitizeInput(username.trim());
            const sanitizedPassword = sanitizeInput(password);

            if (!sanitizedUsername || !sanitizedPassword) {
                alert("Usuario y contraseña son obligatorios");
                return;
            }

            // ✅ Evita peticiones si se detectan posibles intentos de SQL injection
            if (/select|insert|delete|update|drop|truncate|union|--|#|\*/gi.test(password)) {
                alert("Contraseña inválida: se detectaron caracteres no permitidos");
                return;
            }

            const token = await loginAdmin(sanitizedUsername, sanitizedPassword);
            localStorage.setItem("adminToken", token);
            router.push(`${getBaseUrl()}/${currentLocale}/admin/dashboard`);
        } catch (err) {
            alert("Error de autenticación: " + err);
        }
    };

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 mt-28">
            <div className="w-full p-6 bg-white rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4 flex flex-col justify-center items-center">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">User</label>
                        <input
                            type="text"
                            id="username"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-80 mt-1 p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-80 mt-1 p-3 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-20 p-3 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
