import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UsersRepositories from "../repositories/UsersRepositories";

export default async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const id = request.user.id;

  const userRepository = getCustomRepository(UsersRepositories);

  const {admin} = await userRepository.findOne(id);

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Usuário não autorizado!",
  });
}
