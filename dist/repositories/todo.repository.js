import { prisma } from "../config/prisma";
export class TodoRepository {
    async createTodo(userId, input) {
        return prisma.todo.create({
            data: {
                userId,
                title: input.title,
                description: input.description,
            },
        });
    }
    async getTodoById(id, userId) {
        return prisma.todo.findFirst({
            where: {
                id,
                userId,
            },
        });
    }
    async getTodosByUserId(userId, status) {
        return prisma.todo.findMany({
            where: {
                userId,
                ...(status && { status }),
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    async updateTodo(id, userId, input) {
        const result = await prisma.todo.updateMany({
            where: {
                id,
                userId,
            },
            data: {
                ...(input.title && { title: input.title }),
                ...(input.description !== undefined && { description: input.description }),
                ...(input.status && { status: input.status }),
                ...(input.isCompleted !== undefined && { isCompleted: input.isCompleted }),
            },
        });
        return result.count;
    }
    async deleteTodo(id, userId) {
        const result = await prisma.todo.deleteMany({
            where: {
                id,
                userId,
            },
        });
        return result.count;
    }
    async getTodoCount(userId) {
        return prisma.todo.count({
            where: {
                userId,
            },
        });
    }
}
export const todoRepository = new TodoRepository();
//# sourceMappingURL=todo.repository.js.map