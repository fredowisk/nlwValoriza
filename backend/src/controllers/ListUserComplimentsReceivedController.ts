import { Request, Response } from "express";
import ListUserComplimentsReceivedService from "../service/ListUserComplimentsReceivedService";

export default class ListUserComplimentsReceivedController {
  async handle(request: Request, response: Response) {
    const userId = request.user.id;

    const listUserComplimentsReceivedService =
      new ListUserComplimentsReceivedService();

    const compliments = await listUserComplimentsReceivedService.execute(
      userId
    );

    return response.json(compliments);
  }
}
