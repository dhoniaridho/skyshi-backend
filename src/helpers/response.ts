import { NextFunction, Request, Response } from 'express'

export function response(req: Request, res: Response, next?: NextFunction) {
  return {
    json: <T = any>(
      data: T,
      status = 'Success',
      message = 'Success',
      statusCode = 200
    ) => {
      return res.status(statusCode).json({
        data,
        message,
        status
      })
    }
  }
}
