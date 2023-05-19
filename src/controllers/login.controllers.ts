import { Request, Response } from "express";
import { userLoginSchema } from "../schemas/user.schema";
import createTokenService from "../services/login/createToken.service";

const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginData = userLoginSchema.parse(req.body);

  const token = await createTokenService(loginData);

  return res.status(200).json(token);
};

export default loginController;
