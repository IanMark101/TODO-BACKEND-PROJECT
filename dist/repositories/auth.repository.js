import { prisma } from "../config/prisma";
export class AuthRepository {
    async createUser(email, password, name) {
        return prisma.user.create({
            data: {
                email,
                password,
                name,
            },
        });
    }
    async getUserByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
    async getUserById(id) {
        return prisma.user.findUnique({
            where: { id },
        });
    }
    async updateUserEmailVerified(userId) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                emailVerified: new Date(),
            },
        });
    }
    async createToken(userId, type, token, expiresAt) {
        return prisma.token.create({
            data: {
                userId,
                type,
                token,
                expiresAt,
            },
        });
    }
    async getTokenByValue(token) {
        return prisma.token.findUnique({
            where: { token },
        });
    }
    async consumeToken(tokenId) {
        return prisma.token.update({
            where: { id: tokenId },
            data: {
                consumedAt: new Date(),
            },
        });
    }
    async revokeToken(tokenId) {
        return prisma.token.update({
            where: { id: tokenId },
            data: {
                revokedAt: new Date(),
            },
        });
    }
    async getUserTokensByType(userId, type) {
        return prisma.token.findMany({
            where: {
                userId,
                type,
            },
        });
    }
}
export const authRepository = new AuthRepository();
//# sourceMappingURL=auth.repository.js.map