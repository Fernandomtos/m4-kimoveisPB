import { Repository } from "typeorm";
import { TUserRequest, TUserResponse } from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userSchemaResponse } from "../../schemas/user.schema";

const createUsersService = async (
  userData: TUserRequest
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User = userRepository.create(userData);
  await userRepository.save(user);

  const newUser: TUserResponse = userSchemaResponse.parse(user);

  return newUser;
};

export default createUsersService;
