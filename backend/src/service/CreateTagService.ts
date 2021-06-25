import { getCustomRepository } from "typeorm";
import AppError from "../errors/AppError";
import TagsRepositories from "../repositories/TagsRepositories";

export default class CreateTagService {
  async execute(name: string) {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new AppError("Nome incorreto!");
    }

    const tagAlreadyExists = await tagsRepositories.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new AppError("A tag já existe!");
    }

    const tag = tagsRepositories.create({
      name,
    });

    await tagsRepositories.save(tag);

    return tag;
  }
}
