import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "@/config/env";
import { Role } from "@/generated/prisma/enums";

export interface TokenPayload {
  userId: string;
  role: Role;
}

export const generateAccessToken = (userId: string, role: Role): string => {
  const options: SignOptions = { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as any;
  return jwt.sign({ userId, role }, env.JWT_ACCESS_SECRET, options);
};

export const generateRefreshToken = (userId: string): string => {
  const options: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as any;
  return jwt.sign({ userId }, env.JWT_REFRESH_SECRET, options);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};
