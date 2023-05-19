import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";

const softDeleteUsersService = async (userId: number): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userRemove: User | null = await userRepository.findOneBy({
    id: userId,
  });

  if (userRemove) {
    await userRepository.softDelete(userRemove.id);
  }

  return;
};

export default softDeleteUsersService;
