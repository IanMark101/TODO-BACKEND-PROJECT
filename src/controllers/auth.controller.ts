import { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { sendSuccess } from "@/utils/response";
import { authService } from "@/services/auth.service";
import type {
  SignupInput,
  LoginInput,
  VerifyEmailInput,
  RefreshTokenInput,
} from "@/schema/auth.schema";

export class AuthController {
  signup = asyncHandler(async (req: Request, res: Response) => {
    const input = req.body as SignupInput;
    const result = await authService.signup(input);
    return sendSuccess(res, 201, "User registered successfully", result);
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const input = req.body as LoginInput;
    const result = await authService.login(input);
    return sendSuccess(res, 200, "Login successful", result);
  });

  verifyEmail = asyncHandler(async (req: Request, res: Response) => {
    const input: VerifyEmailInput = {
      token: req.query.token as string,
    };
    const result = await authService.verifyEmail(input);
    return sendSuccess(res, 200, result.message);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const input = req.body as RefreshTokenInput;
    const result = await authService.refreshToken(input.refreshToken);
    return sendSuccess(res, 200, "Token refreshed successfully", result);
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    const input = req.body as RefreshTokenInput;
    const result = await authService.logout(input.refreshToken);
    return sendSuccess(res, 200, result.message);
  });
}

export const authController = new AuthController();
