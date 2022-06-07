import { Request, Response } from "express";
import { UserAuthorizationUseCase } from "./userAuthorizationUseCase";


class UserAuthorizationController {

    constructor(private userAuthorizationUseCase: UserAuthorizationUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {

        const { cpf } = req.body;

        const user = await this.userAuthorizationUseCase.execute(cpf);

        return res.json(user);

    }

}

export { UserAuthorizationController };

