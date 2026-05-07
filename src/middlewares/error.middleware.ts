import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError";
import { sendError } from "@/utils/response";
import { env } from "@/config/env";

export const errorMiddleware = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return sendError(res, error.statusCode, error.message, error.errors);
  }

  // Log unexpected errors in development
  if (env.NODE_ENV === "development") {
    console.error("Unexpected error:", error);
  }

  return sendError(res, 500, "Internal Server Error");
};
