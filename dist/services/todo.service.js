import { ApiError } from "../utils/ApiError";
import { todoRepository } from "../repositories/todo.repository";
import { TodoStatus } from "../generated/prisma/enums";
export class TodoService {
    async createTodo(userId, input) {
        return todoRepository.createTodo(userId, input);
    }
    async getTodoById(id, userId) {
        const todo = await todoRepository.getTodoById(id, userId);
        if (!todo) {
            throw ApiError.notFound("Todo not found");
        }
        return todo;
    }
    async getTodosByUserId(userId, status) {
        return todoRepository.getTodosByUserId(userId, status);
    }
    async updateTodo(id, userId, input) {
        // Verify todo exists
        await this.getTodoById(id, userId);
        const count = await todoRepository.updateTodo(id, userId, input);
        if (count === 0) {
            throw ApiError.notFound("Todo not found");
        }
        // Return updated todo
        return todoRepository.getTodoById(id, userId);
    }
    async deleteTodo(id, userId) {
        // Verify todo exists
        await this.getTodoById(id, userId);
        const result = await todoRepository.deleteTodo(id, userId);
        if (result === 0) {
            throw ApiError.notFound("Todo not found");
        }
        return {
            message: "Todo deleted successfully",
        };
    }
    async getTodoStats(userId) {
        const total = await todoRepository.getTodoCount(userId);
        const todos = await todoRepository.getTodosByUserId(userId);
        const completed = todos.filter((t) => t.status === TodoStatus.COMPLETED).length;
        const pending = todos.filter((t) => t.status === TodoStatus.PENDING).length;
        const inProgress = todos.filter((t) => t.status === TodoStatus.IN_PROGRESS).length;
        return {
            total,
            completed,
            pending,
            inProgress,
        };
    }
}
export const todoService = new TodoService();
//# sourceMappingURL=todo.service.js.map