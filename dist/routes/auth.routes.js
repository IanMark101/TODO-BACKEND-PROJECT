import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { signupSchema, loginSchema, refreshTokenSchema, } from "../schema/auth.schema";
const router = Router();
router.post("/signup", validateMiddleware(signupSchema), authController.signup);
router.post("/login", validateMiddleware(loginSchema), authController.login);
router.get("/verify-email", authController.verifyEmail);
router.post("/refresh-token", validateMiddleware(refreshTokenSchema), authController.refreshToken);
router.post("/logout", validateMiddleware(refreshTokenSchema), authController.logout);
export default router;
//# sourceMappingURL=auth.routes.js.map