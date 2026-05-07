import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "@/utils/ApiError";

export const validateMiddleware =
  (schema: ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const errors = error.errors.map(
        (err: any) => `${err.path.join(".")}: ${err.message}`
      );
      throw ApiError.badRequest("Validation failed", errors);
    }
  };
