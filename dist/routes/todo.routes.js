import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { todoController } from "../controllers/todo.controller";
import { createTodoSchema, updateTodoSchema } from "../schema/todo.schema";
const router = Router();
// All todo routes require authentication
router.use(authMiddleware);
router.post("/", validateMiddleware(createTodoSchema), todoController.createTodo);
router.get("/", todoController.getTodos);
router.get("/stats", todoController.getTodoStats);
router.get("/:id", todoController.getTodoById);
router.patch("/:id", validateMiddleware(updateTodoSchema), todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);
export default router;
//# sourceMappingURL=todo.routes.js.map