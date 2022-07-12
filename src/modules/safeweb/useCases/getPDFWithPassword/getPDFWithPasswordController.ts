import { Request, Response } from "express";
import { GetpdfWithPasswordUseCase } from "./getPDFWithPasswordUseCase";

class GetpdfWithPasswordController {

    constructor(private getpdfWithPasswordUseCase: GetpdfWithPasswordUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {

        const { password, cpf, pdfNotSigned } = req.body;

        if (password) {
            const pdfSigned = await this.getpdfWithPasswordUseCase.execute({ password, cpf, pdfNotSigned });
            return res.json({ pdfSigned });
        }

    }

}

export { GetpdfWithPasswordController };

