import { TokenType } from "@/generated/prisma/enums";
import { ApiError } from "@/utils/ApiError";
import { authRepository } from "@/repositories/auth.repository";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/lib/jwt";
import { hashPassword, comparePasswords } from "@/utils/password";
import {
  createEmailVerificationToken,
  createRefreshTokenInDb,
  validateTokenRecord,
} from "@/utils/token";
import { sendVerificationEmail } from "@/utils/email";
import type {
  SignupInput,
  LoginInput,
  VerifyEmailInput,
} from "@/schema/auth.schema";

export class AuthService {
  async signup(input: SignupInput) {
    const existingUser = await authRepository.getUserByEmail(input.email);
    if (existingUser) {
      throw ApiError.conflict("Email already registered");
    }

    const hashedPassword = await hashPassword(input.password);
    const user = await authRepository.createUser(
      input.email,
      hashedPassword,
      input.name
    );

    const verificationToken = await createEmailVerificationToken(user.id);
    await sendVerificationEmail(user.email!, verificationToken);

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      message:
        "Signup successful. Please check your email to verify your account.",
    };
  }

  async login(input: LoginInput) {
    const user = await authRepository.getUserByEmail(input.email);
    if (!user) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    if (!user.emailVerified) {
      throw ApiError.badRequest("Please verify your email first");
    }

    const isPasswordValid = await comparePasswords(
      input.password,
      user.password!
    );
    if (!isPasswordValid) {
      throw ApiError.unauthorized("Invalid email or password");
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = await createRefreshTokenInDb(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  async verifyEmail(input: VerifyEmailInput) {
    const tokenRecord = await authRepository.getTokenByValue(input.token);
    if (!tokenRecord) {
      throw ApiError.badRequest("Invalid or expired token");
    }

    try {
      validateTokenRecord(tokenRecord);
    } catch (error: any) {
      throw ApiError.badRequest(error.message);
    }

    if (tokenRecord.type !== TokenType.EMAIL_VERIFY) {
      throw ApiError.badRequest("Invalid token type");
    }

    await authRepository.updateUserEmailVerified(tokenRecord.userId);
    await authRepository.consumeToken(tokenRecord.id);

    return {
      message: "Email verified successfully",
    };
  }

  async refreshToken(refreshToken: string) {
    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw ApiError.unauthorized("Invalid or expired refresh token");
    }

    const tokenRecord = await authRepository.getTokenByValue(refreshToken);
    if (!tokenRecord) {
      throw ApiError.unauthorized("Refresh token not found");
    }

    try {
      validateTokenRecord(tokenRecord);
    } catch (error: any) {
      throw ApiError.unauthorized(error.message);
    }

    const user = await authRepository.getUserById(payload.userId);
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    const newAccessToken = generateAccessToken(user.id, user.role);

    return {
      accessToken: newAccessToken,
    };
  }

  async logout(refreshToken: string) {
    const tokenRecord = await authRepository.getTokenByValue(refreshToken);
    if (tokenRecord) {
      await authRepository.revokeToken(tokenRecord.id);
    }

    return {
      message: "Logout successful",
    };
  }
}

export const authService = new AuthService();
