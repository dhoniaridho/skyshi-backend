import { NextFunction, Request, Response } from "express";

export function response(req: Request, res: Response, next?: NextFunction) {
  return {
    json: <T = any>(data: T, status = 200, message = "Success") => {
      return res.status(status).json({
        data,
        message,
        status,
      });
    },
  };
}
