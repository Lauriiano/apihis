import { Request, Response } from "express";
import { CreateAuthorizationUseCase } from "./CreateAuthorizationUseCase";

class CreateAuthorizationController {

    constructor(private createAuthorizationUseCase: CreateAuthorizationUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { cpf } = req.body;

        await this.createAuthorizationUseCase.execute({ cpf });

        return res.status(201).json({ msg: "CPF cadastrado com sucesso" });
    }

}

export { CreateAuthorizationController };

