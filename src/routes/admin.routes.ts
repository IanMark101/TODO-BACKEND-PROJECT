import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { adminMiddleware } from "@/middlewares/admin.middleware";
import { adminController } from "@/controllers/admin.controller";

const router = Router();

// All admin routes require: valid JWT + ADMIN role
router.use(authMiddleware, adminMiddleware);

router.get("/users",         adminController.getAllUsers);
router.get("/users/:id",     adminController.getUserById);
router.delete("/users/:id",  adminController.deleteUser);
router.get("/todos",         adminController.getAllTodos);

export default router;
