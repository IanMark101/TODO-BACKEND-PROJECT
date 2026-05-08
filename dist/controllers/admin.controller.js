import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { adminService } from "../services/admin.service";
const getId = (req) => Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
export class AdminController {
    getAllUsers = asyncHandler(async (req, res) => {
        const users = await adminService.getAllUsers();
        return sendSuccess(res, 200, "Users retrieved successfully", users);
    });
    getUserById = asyncHandler(async (req, res) => {
        const user = await adminService.getUserById(getId(req));
        return sendSuccess(res, 200, "User retrieved successfully", user);
    });
    deleteUser = asyncHandler(async (req, res) => {
        const result = await adminService.deleteUser(getId(req));
        return sendSuccess(res, 200, result.message);
    });
    getAllTodos = asyncHandler(async (req, res) => {
        const todos = await adminService.getAllTodos();
        return sendSuccess(res, 200, "Todos retrieved successfully", todos);
    });
}
export const adminController = new AdminController();
//# sourceMappingURL=admin.controller.js.map