import { verifyAccessToken } from "../lib/jwt";
import { ApiError } from "../utils/ApiError";
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw ApiError.unauthorized("Missing authorization header");
        }
        const token = authHeader.replace("Bearer ", "");
        if (!token) {
            throw ApiError.unauthorized("Invalid authorization header format");
        }
        const payload = verifyAccessToken(token);
        req.user = {
            id: payload.userId,
        };
        next();
    }
    catch (error) {
        if (error instanceof ApiError) {
            return next(error);
        }
        next(ApiError.unauthorized("Invalid token"));
    }
};
//# sourceMappingURL=auth.middleware.js.map