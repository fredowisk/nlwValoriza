import { Request, Response } from "express";
import ListTagsService from "../service/ListTagsService";

export default class ListTagsController {
  async handle(request: Request, response: Response) {
    const listTagsService = new ListTagsService();

    const tags = await listTagsService.execute();

    return response.json(tags);
  }
}
