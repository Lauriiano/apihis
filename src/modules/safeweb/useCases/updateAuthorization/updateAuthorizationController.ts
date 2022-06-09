import { Request, Response } from "express";
import { UpdateAuthorizationUseCase } from "./updateAuthorizationUseCase";


class UpdateAuthorizationController {

    constructor(private updateAuthorizationUseCase: UpdateAuthorizationUseCase) { }

    async handle(req: Request, res: Response): Promise<Response | Error> {

        const { identifierCA, state, serialNumber, expirationDate } = req.body;

        try {
            await this.updateAuthorizationUseCase.execute({ identifierCA, state, serialNumber, expirationDate });
        } catch (error) {
            return res.json({ error: "Erro ao fazer o update, verifique todos os parametros" })
        }
        return res.json({ msg: "update realizado sucesso" })


    }

}

export { UpdateAuthorizationController };

