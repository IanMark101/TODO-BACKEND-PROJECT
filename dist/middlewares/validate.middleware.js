import { ApiError } from "../utils/ApiError";
export const validateMiddleware = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        const errors = error.errors.map((err) => `${err.path.join(".")}: ${err.message}`);
        throw ApiError.badRequest("Validation failed", errors);
    }
};
//# sourceMappingURL=validate.middleware.js.map