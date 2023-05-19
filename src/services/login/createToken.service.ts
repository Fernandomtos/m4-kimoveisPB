import { Repository } from "typeorm";
import { IToken, TLoginRequest } from "../../interfaces/login.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import AppError from "../../error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const createTokenService = async (
  loginData: TLoginRequest
): Promise<IToken> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
  });

  if (!user || user.deletedAt != null) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch: boolean = await compare(
    loginData.password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return { token };
};

export default createTokenService;
