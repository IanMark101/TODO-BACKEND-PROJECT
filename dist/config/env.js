import "dotenv/config";
export const env = {
    // Server
    PORT: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    // Database
    DATABASE_URL: process.env.DATABASE_URL || "",
    // JWT
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "access-secret-key",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refresh-secret-key",
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    // Email
    SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com",
    SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
    SMTP_USER: process.env.SMTP_USER || "",
    SMTP_PASS: process.env.SMTP_PASS || "",
    SMTP_FROM: process.env.SMTP_FROM || "noreply@todoapp.com",
    // App
    APP_URL: process.env.APP_URL || "http://localhost:3000",
};
// Validate critical env variables
const validateEnv = () => {
    if (!env.DATABASE_URL) {
        throw new Error("DATABASE_URL is not defined");
    }
};
validateEnv();
//# sourceMappingURL=env.js.map