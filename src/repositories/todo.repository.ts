import { prisma } from "@/config/prisma";
import { TodoStatus } from "@/generated/prisma/enums";
import type { CreateTodoInput, UpdateTodoInput } from "@/schema/todo.schema";

export class TodoRepository {
  async createTodo(userId: string, input: CreateTodoInput) {
    return prisma.todo.create({
      data: {
        userId,
        title: input.title,
        description: input.description,
      },
    });
  }

  async getTodoById(id: string, userId: string) {
    return prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  async getTodosByUserId(userId: string, status?: TodoStatus) {
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

  async updateTodo(id: string, userId: string, input: UpdateTodoInput) {
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

  async deleteTodo(id: string, userId: string) {
    const result = await prisma.todo.deleteMany({
      where: {
        id,
        userId,
      },
    });
    return result.count;
  }

  async getTodoCount(userId: string) {
    return prisma.todo.count({
      where: {
        userId,
      },
    });
  }
}

export const todoRepository = new TodoRepository();
