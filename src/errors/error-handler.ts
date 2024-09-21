import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppError } from "./app-error";

export const handleError = (error: any, request: Request, h: ResponseToolkit) => {
  if (error instanceof AppError) {
    if (error.message === 'Field "price" is required' || error.message === 'Field "price" cannot be negative') {
      return h.response({
        errors: [
          {
            field: "price",
            message: error.message,
          },
        ],
      }).code(error.statusCode);
    }
    if (error.message === 'Field "price" cannot be negative' || error.message === 'Field "price" cannot be negative') {
      return h.response({
        errors: [
          {
            field: "price",
            message: error.message,
          },
        ],
      }).code(error.statusCode);
    }
    return h.response({ message: error.message }).code(error.statusCode);
  }
  return h.response({ message: "Internal Server Error" }).code(500);
};