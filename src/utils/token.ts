import crypto from "crypto";
import { TokenType } from "@/generated/prisma/enums";
import { generateRefreshToken } from "@/lib/jwt";
import { authRepository } from "@/repositories/auth.repository";

const TOKEN_EXPIRY = {
  EMAIL_VERIFY: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH: 7 * 24 * 60 * 60 * 1000,  // 7 days
};

export const createEmailVerificationToken = async (userId: string): Promise<string> => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY.EMAIL_VERIFY);
  await authRepository.createToken(userId, TokenType.EMAIL_VERIFY, token, expiresAt);
  return token;
};

export const createRefreshTokenInDb = async (userId: string): Promise<string> => {
  const token = generateRefreshToken(userId);
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRY.REFRESH);
  await authRepository.createToken(userId, TokenType.REFRESH, token, expiresAt);
  return token;
};

export const validateTokenRecord = (tokenRecord: any): void => {
  if (!tokenRecord)          throw new Error("Invalid or expired token");
  if (tokenRecord.consumedAt) throw new Error("Token already used");
  if (tokenRecord.revokedAt)  throw new Error("Token has been revoked");
  if (tokenRecord.expiresAt < new Date()) throw new Error("Token has expired");
};

