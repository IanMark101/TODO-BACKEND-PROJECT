import { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { sendSuccess } from "@/utils/response";
import { todoService } from "@/services/todo.service";
import { TodoStatus } from "@/generated/prisma/enums";
import type { CreateTodoInput, UpdateTodoInput } from "@/schema/todo.schema";

export class TodoController {
  createTodo = asyncHandler(async (req: Request, res: Response) => {
    const input = req.body as CreateTodoInput;
    const userId = req.user!.id;

    const todo = await todoService.createTodo(userId, input);

    return sendSuccess(res, 201, "Todo created successfully", todo);
  });

  getTodos = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const status = req.query.status as TodoStatus | undefined;

    const todos = await todoService.getTodosByUserId(userId, status);

    return sendSuccess(res, 200, "Todos retrieved successfully", todos);
  });

  getTodoById = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const todo = await todoService.getTodoById(id, userId);

    return sendSuccess(res, 200, "Todo retrieved successfully", todo);
  });

  updateTodo = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const input = req.body as UpdateTodoInput;

    const todo = await todoService.updateTodo(id, userId, input);

    return sendSuccess(res, 200, "Todo updated successfully", todo);
  });

  deleteTodo = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const result = await todoService.deleteTodo(id, userId);

    return sendSuccess(res, 200, result.message);
  });

  getTodoStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user!.id;

    const stats = await todoService.getTodoStats(userId);

    return sendSuccess(res, 200, "Todo stats retrieved successfully", stats);
  });
}

export const todoController = new TodoController();
