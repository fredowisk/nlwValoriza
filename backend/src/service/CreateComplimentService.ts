import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import ComplimentsRepositories from "../repositories/ComplimentsRepositories";
import UsersRepositories from "../repositories/UsersRepositories";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

export default class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );
    const userRepository = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) {
      throw new AppError("Você não pode elogiar a si mesmo!");
    }

    const userReceiverExists = await userRepository.findOne(user_receiver);

    if (!userReceiverExists) {
      throw new AppError("O usuário elogiado não existe!");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}
