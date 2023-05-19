import { Repository } from "typeorm";
import {
  TUserResponse,
  TUserUpdateRequest,
} from "../../interfaces/user.interface";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userSchemaResponse } from "../../schemas/user.schema";

const updateUsersService = async (
  userData: TUserUpdateRequest,
  userId: number
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const newUserData: User = userRepository.create({
    ...oldUserData,
    ...userData,
  });

  await userRepository.save(newUserData);

  const returnUser: TUserResponse = userSchemaResponse.parse(newUserData);

  return returnUser;
};

export default updateUsersService;
