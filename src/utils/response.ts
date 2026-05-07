import { Response } from "express";

interface ApiResponse<T = unknown> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
  errors?: unknown[];
}

export const sendResponse = <T = unknown>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
  errors?: unknown[]
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: statusCode < 400,
    statusCode,
    message,
    ...(data && { data }),
    ...(errors && errors.length > 0 && { errors }),
  });
};

export const sendSuccess = <T = unknown>(
  res: Response,
  statusCode: number = 200,
  message: string = "Success",
  data?: T
): Response<ApiResponse<T>> => {
  return sendResponse(res, statusCode, message, data);
};

export const sendError = (
  res: Response,
  statusCode: number = 500,
  message: string = "Error",
  errors?: unknown[]
): Response<ApiResponse> => {
  return sendResponse<any>(res, statusCode, message, undefined, errors);
};
