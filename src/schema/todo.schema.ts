import { z } from "zod";
import { TodoStatus } from "@/generated/prisma/enums";

export const createTodoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().optional(),
  status: z.enum([TodoStatus.PENDING, TodoStatus.IN_PROGRESS, TodoStatus.COMPLETED, TodoStatus.CANCELLED]).optional(),
  isCompleted: z.boolean().optional(),
});

export const getTodoSchema = z.object({
  id: z.string().uuid("Invalid todo ID"),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
export type GetTodoInput = z.infer<typeof getTodoSchema>;
