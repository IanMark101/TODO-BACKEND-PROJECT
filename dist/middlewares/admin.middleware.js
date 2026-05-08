import { ApiError } from "../utils/ApiError";
import { Role } from "../generated/prisma/enums";
export const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== Role.ADMIN) {
        return next(ApiError.forbidden("Access denied. Admins only."));
    }
    next();
};
//# sourceMappingURL=admin.middleware.js.map