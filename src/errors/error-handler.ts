import { Request, ResponseToolkit } from "@hapi/hapi";
import { AppError } from "./app-error";
import { ErrorBussines } from "./constants.errors";

export const handleError = (error: any, request: Request, h: ResponseToolkit) => {
  if (error instanceof AppError) {
    if (error.message === ErrorBussines.PRICE_REQUIRED || error.message === ErrorBussines.PRICE_NEGATIVE) {
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
  return h.response({ message: ErrorBussines.INTERNAL_ERROR }).code(500);
};