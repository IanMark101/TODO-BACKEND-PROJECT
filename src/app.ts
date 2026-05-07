import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "@/routes/auth.routes";
import todoRoutes from "@/routes/todo.routes";
import adminRoutes from "@/routes/admin.routes";
import { errorMiddleware } from "@/middlewares/error.middleware";

const app = express();

// Middleware
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(cors());
app.use(cookieParser());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Routes
app.use("/api/auth",  authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorMiddleware);

export default app;
