import { z } from "zod";
import { userLoginSchema } from "../schemas/user.schema";

type TLoginRequest = z.infer<typeof userLoginSchema>;

interface IToken {
  token: string;
}

export { TLoginRequest, IToken };
