const isProduction = process.env.NODE_ENV === "production";

const SERVER_URL = isProduction
    ? process.env.NEXT_PUBLIC_API_URL?.replace("http://", "https://") || "https://yourspecialclosettest.store"
    : "http://localhost:4001"; // 💡 Fuerza localhost en desarrollo

export default SERVER_URL;
