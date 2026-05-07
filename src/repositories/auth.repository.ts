import { prisma } from "@/config/prisma";
import { TokenType } from "@/generated/prisma/enums";

export class AuthRepository {
  async createUser(email: string, password: string, name: string) {
    return prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  }

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async updateUserEmailVerified(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        emailVerified: new Date(),
      },
    });
  }

  async createToken(
    userId: string,
    type: TokenType,
    token: string,
    expiresAt: Date
  ) {
    return prisma.token.create({
      data: {
        userId,
        type,
        token,
        expiresAt,
      },
    });
  }

  async getTokenByValue(token: string) {
    return prisma.token.findUnique({
      where: { token },
    });
  }

  async consumeToken(tokenId: string) {
    return prisma.token.update({
      where: { id: tokenId },
      data: {
        consumedAt: new Date(),
      },
    });
  }

  async revokeToken(tokenId: string) {
    return prisma.token.update({
      where: { id: tokenId },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async getUserTokensByType(userId: string, type: TokenType) {
    return prisma.token.findMany({
      where: {
        userId,
        type,
      },
    });
  }
}

export const authRepository = new AuthRepository();
