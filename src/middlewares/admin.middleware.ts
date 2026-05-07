import { Request, Response, NextFunction } from "express";
import { ApiError } from "@/utils/ApiError";
import { Role } from "@/generated/prisma/enums";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== Role.ADMIN) {
    return next(ApiError.forbidden("Access denied. Admins only."));
  }
  next();
};
