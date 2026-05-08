import { verifyAccessToken } from "../lib/jwt";
import { ApiError } from "../utils/ApiError";
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            throw ApiError.unauthorized("Missing or invalid authorization header");
        }
        const token = authHeader.split(" ")[1];
        const payload = verifyAccessToken(token);
        req.user = { id: payload.userId, role: payload.role };
        next();
    }
    catch (error) {
        next(error instanceof ApiError ? error : ApiError.unauthorized("Invalid token"));
    }
};
//# sourceMappingURL=auth.middleware.js.map