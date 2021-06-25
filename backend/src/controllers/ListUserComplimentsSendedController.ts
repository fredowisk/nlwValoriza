import { Request, Response } from "express";
import ListUserComplimentsSendedService from "../service/ListUserComplimentsSendedService";

export default class ListUserComplimentsSendedController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;

    const listUserComplimentsSendedService =
      new ListUserComplimentsSendedService();

    const compliments = await listUserComplimentsSendedService.execute(userId);

    return response.json(compliments);
  }
}
