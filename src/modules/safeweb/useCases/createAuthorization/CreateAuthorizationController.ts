import { Request, Response } from "express";
import { CreateAuthorizationUseCase } from "./CreateAuthorizationUseCase";

class CreateAuthorizationController {

    constructor(private createAuthorizationUseCase: CreateAuthorizationUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const { identifierCA = "", serialNumber = "", expirationDate = "", state = "" } = req.body;

        await this.createAuthorizationUseCase.execute({ identifierCA, state, expirationDate, serialNumber });

        return res.status(201).json({ msg: "Autorização cadastrada com sucesso" });
    }

}

export { CreateAuthorizationController };

