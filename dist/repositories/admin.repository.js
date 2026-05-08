import { prisma } from "../config/prisma";
const USER_SAFE_FIELDS = {
    id: true,
    email: true,
    name: true,
    role: true,
    emailVerified: true,
    createdAt: true,
};
export class AdminRepository {
    getAllUsers() {
        return prisma.user.findMany({
            select: USER_SAFE_FIELDS,
            orderBy: { createdAt: "desc" },
        });
    }
    getUserById(id) {
        return prisma.user.findUnique({
            where: { id },
            select: USER_SAFE_FIELDS,
        });
    }
    deleteUser(id) {
        return prisma.user.delete({ where: { id } });
    }
    getAllTodos() {
        return prisma.todo.findMany({
            include: {
                user: { select: { id: true, email: true, name: true } },
            },
            orderBy: { createdAt: "desc" },
        });
    }
}
export const adminRepository = new AdminRepository();
//# sourceMappingURL=admin.repository.js.map