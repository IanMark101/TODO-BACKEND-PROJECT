import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { authService } from "../services/auth.service";
export class AuthController {
    signup = asyncHandler(async (req, res) => {
        const input = req.body;
        const result = await authService.signup(input);
        return sendSuccess(res, 201, "User registered successfully", result);
    });
    login = asyncHandler(async (req, res) => {
        const input = req.body;
        const result = await authService.login(input);
        return sendSuccess(res, 200, "Login successful", result);
    });
    verifyEmail = asyncHandler(async (req, res) => {
        const input = {
            token: req.query.token,
        };
        const result = await authService.verifyEmail(input);
        return sendSuccess(res, 200, result.message);
    });
    refreshToken = asyncHandler(async (req, res) => {
        const input = req.body;
        const result = await authService.refreshToken(input.refreshToken);
        return sendSuccess(res, 200, "Token refreshed successfully", result);
    });
    logout = asyncHandler(async (req, res) => {
        const input = req.body;
        const result = await authService.logout(input.refreshToken);
        return sendSuccess(res, 200, result.message);
    });
}
export const authController = new AuthController();
//# sourceMappingURL=auth.controller.js.map