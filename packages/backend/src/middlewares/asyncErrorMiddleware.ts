import { ExternalApiError } from '../types/errors/external-api.error';
import { NextFunction, Request, RequestHandler, Response } from 'express';

interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[] | number;
}

export const asyncErrorMiddleware = <
  Params extends Record<string, string>,
  Res extends Record<string, unknown> | string | null | void = void,
  Body extends Record<string, unknown> | undefined = undefined,
  Query extends ParsedQs = Record<string, never>,
>(
  endpointHandlerFunction: RequestHandler<Params, Res, Body, Query>,
) => {
  return async function (
    req: Request<Params, Res, Body, Query>,
    res: Response,
    next: NextFunction,
  ) {
    try {
      return await endpointHandlerFunction(req, res, next);
    } catch (error) {
      if (error instanceof ExternalApiError) {
        res.status(400).json({ message: 'External API error', serviceName: error.serviceName, originalMessage: error.message, details: error.details });
      } else if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };
};
