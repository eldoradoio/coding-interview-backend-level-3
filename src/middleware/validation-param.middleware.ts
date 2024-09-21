import { Lifecycle } from "@hapi/hapi";
import { ErrorBussines } from "../errors/constants.errors";

export const validateIdParam: Lifecycle.Method = (request, h) => {
    const id = request.params.id;
    if (!/^\d+$/.test(id)) {
    return h
      .response({
        message: ErrorBussines.INVALID_ID,
        param: request.params.id
      })
      .code(400)
      .takeover();
  }
  return h.continue;
};
