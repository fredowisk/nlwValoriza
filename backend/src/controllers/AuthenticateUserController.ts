import { Request, Response } from "express";
import AuthenticateUserService from "../service/AuthenticateUserService";

interface IUserRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export default class AuthenticateUserController {
  async handle(request: IUserRequest, response: Response) {
    const { email, password } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    const { userAlreadyExists: user, token } =
      await authenticateUserService.execute({
        email,
        password,
      });

    return response.json({ user, token });
  }
}
