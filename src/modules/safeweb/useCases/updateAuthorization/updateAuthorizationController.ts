import { Request, Response } from "express";
import { UpdateAuthorizationUseCase } from "./updateAuthorizationUseCase";


class UpdateAuthorizationController {

    constructor(private updateAuthorizationUseCase: UpdateAuthorizationUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {

        const { identifierCA = null, state = null, serialNumber = null, expirationDate = null, error = null } = req.body;

        const updateAuthorization = this.updateAuthorizationUseCase.execute({ identifierCA, state, serialNumber, expirationDate, error });

        return res.json({ msg: "atualizado com sucesso" });

    }

}

export { UpdateAuthorizationController };

