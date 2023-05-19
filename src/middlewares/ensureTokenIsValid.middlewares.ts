import { NextFunction, Request, Response } from "express";
import AppError from "../error";
import { verify } from "jsonwebtoken";
import "dotenv/config";

const ensureTokenIsValidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const tokenAuthorization: string | undefined = req.headers.authorization;

  if (!tokenAuthorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const [_bearer, token] = tokenAuthorization.split(" ");

  verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    res.locals.userId = decoded.sub;
    res.locals.admin = decoded.admin;
  });

  return next();
};

export default ensureTokenIsValidMiddleware;
