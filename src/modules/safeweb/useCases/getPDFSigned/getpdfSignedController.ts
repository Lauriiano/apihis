import { Request, Response } from "express";
import { AppError } from "../../../../errors/AppError";
import { GetpdfSignedUseCase } from "./getpdfSignedUseCase";

class GetpdfSignedController {

    constructor(private getpdfSignedUseCase: GetpdfSignedUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {

        const { token, content } = req.body;

        if (token) {
            const pdfSigned = await this.getpdfSignedUseCase.execute({ token, content });
            return res.json({ pdfSigned });
        }

        throw new AppError("Campos não preenchidos");

    }

}

export { GetpdfSignedController };

