import { Request, Response } from "express";
import CreateComplimentService from "../service/CreateComplimentService";

interface IComplimentRequest extends Request {
  body: {
    tag_id: string;
    user_receiver: string;
    message: string;
  };
}

export default class CreateComplimentController {
  async handle(request: IComplimentRequest, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const { id } = request.user;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender: id,
      user_receiver,
      message,
    });

    return response.json(compliment);
  }
}
