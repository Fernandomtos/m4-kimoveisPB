import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TUsersResponse } from "../../interfaces/user.interface";
import AppError from "../../error";
import { usersSchemaResponse } from "../../schemas/user.schema";

const listAllUsersService = async (): Promise<TUsersResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users: User[] | undefined = await userRepository.find();

  if (!users) {
    throw new AppError("User not found", 404);
  }

  const returnUsers: TUsersResponse = usersSchemaResponse.parse(users);

  return returnUsers;
};

export default listAllUsersService;
