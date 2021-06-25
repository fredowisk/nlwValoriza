import authConfig from "../config/auth";
import { getCustomRepository } from "typeorm";
import UsersRepositories from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../entities/User";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export default class CreateUserService {
  async execute({ name, email, password, admin = false }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("E-mail incorreto");
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error("Este usuário já existe!");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}
