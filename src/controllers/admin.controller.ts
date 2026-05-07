import { Request, Response } from "express";
import { asyncHandler } from "@/utils/asyncHandler";
import { sendSuccess } from "@/utils/response";
import { adminService } from "@/services/admin.service";

const getId = (req: Request) =>
  Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

export class AdminController {
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await adminService.getAllUsers();
    return sendSuccess(res, 200, "Users retrieved successfully", users);
  });

  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await adminService.getUserById(getId(req));
    return sendSuccess(res, 200, "User retrieved successfully", user);
  });

  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await adminService.deleteUser(getId(req));
    return sendSuccess(res, 200, result.message);
  });

  getAllTodos = asyncHandler(async (req: Request, res: Response) => {
    const todos = await adminService.getAllTodos();
    return sendSuccess(res, 200, "Todos retrieved successfully", todos);
  });
}

export const adminController = new AdminController();

