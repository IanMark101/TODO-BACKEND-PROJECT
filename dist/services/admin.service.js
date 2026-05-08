import { ApiError } from "../utils/ApiError";
import { adminRepository } from "../repositories/admin.repository";
export class AdminService {
    getAllUsers() {
        return adminRepository.getAllUsers();
    }
    async getUserById(id) {
        const user = await adminRepository.getUserById(id);
        if (!user)
            throw ApiError.notFound("User not found");
        return user;
    }
    async deleteUser(id) {
        await this.getUserById(id); // ensure exists first
        await adminRepository.deleteUser(id);
        return { message: "User deleted successfully" };
    }
    getAllTodos() {
        return adminRepository.getAllTodos();
    }
}
export const adminService = new AdminService();
//# sourceMappingURL=admin.service.js.map