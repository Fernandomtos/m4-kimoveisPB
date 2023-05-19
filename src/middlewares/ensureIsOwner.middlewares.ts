import { NextFunction, Request, Response } from "express";
import AppError from "../error";

const ensureIsOwnerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userIdParams: number = parseInt(req.params.id);

  const userIdToken: number = parseInt(res.locals.userId);

  const userAdmin = res.locals.admin;

  if (userIdParams != userIdToken && userAdmin != true) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export default ensureIsOwnerMiddleware;
