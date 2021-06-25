import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import UsersRepositories from "../repositories/UsersRepositories";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (!userAlreadyExists) {
      throw new AppError("Email/Senha incorretos!");
    }

    const confirmedPassword = await compare(
      password,
      userAlreadyExists.password
    );

    if (!confirmedPassword) {
      throw new AppError("Email/Senha incorretos!");
    }

    const token = sign(
      {
        email: userAlreadyExists.email,
      },
      authConfig.jwt.secret,
      { subject: userAlreadyExists.id, expiresIn: authConfig.jwt.expiresIn }
    );

    userAlreadyExists.password = 'senha protegida';

    return {userAlreadyExists, token};
  }
}
