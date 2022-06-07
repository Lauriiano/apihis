import { Request, Response } from "express";
import { AuthorizationLisUseCase } from "./AuthorizationsListUseCase";


class AuthorizationsListController {

    constructor(private authorizationUseCase: AuthorizationLisUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const authorizations = await this.authorizationUseCase.execute();

        return res.json(authorizations);
    }

}

export { AuthorizationsListController };

