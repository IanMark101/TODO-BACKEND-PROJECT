import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/lib/jwt";
import { ApiError } from "@/utils/ApiError";
import { Role } from "@/generated/prisma/enums";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: Role };
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Missing or invalid authorization header");
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyAccessToken(token);
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch (error) {
    next(error instanceof ApiError ? error : ApiError.unauthorized("Invalid token"));
  }
};
