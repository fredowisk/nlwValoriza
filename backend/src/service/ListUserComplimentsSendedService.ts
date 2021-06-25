import { getCustomRepository } from "typeorm";
import ComplimentsRepositories from "../repositories/ComplimentsRepositories";

export default class ListUserComplimentsSendedService {
  async execute(userId: string) {
    const complimentsRepositories = getCustomRepository(
      ComplimentsRepositories
    );

    const compliments = await complimentsRepositories.findOne({
      where: {
        user_sender: userId,
      },
      relations: ['tag', 'userReceiver', 'userSender']
    });

    return compliments;
  }
}
