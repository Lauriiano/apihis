import { Request, Response } from "express";
import { CreateAuthorizationUseCase } from "./CreateAuthorizationUseCase";

class CreateAuthorizationController {

    constructor(private createAuthorizationUseCase: CreateAuthorizationUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { identifierCA = "", serialNumber = "", expirationDate = "", state = "", cpf } = req.body;

        await this.createAuthorizationUseCase.execute({ identifierCA, state, expirationDate, serialNumber, cpf });

        return res.status(201).json({ msg: "Autorização cadastrada com sucesso" });
    }

}

export { CreateAuthorizationController };

