import { Request, Response } from "express";
import CreateTagService from "../service/CreateTagService";

interface TagRequest extends Request {
  body: {
    name: string;
  };
}

export default class CreateTagController {
  async handle(request: TagRequest, response: Response) {
    const { name } = request.body;
    const createTagService = new CreateTagService();

    const tag = await createTagService.execute(name);

    return response.json(tag);
  }
}
