import { Request, Response } from "express";
import CreateUserService from "../service/CreateUserService";

interface UserRequest extends Request {
  body: {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
  };
}

export default class CreateUserController {
  async handle(request: UserRequest, response: Response) {
    const { name, email, password, admin } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
      admin,
    });

    return response.json(user);
  }
}
