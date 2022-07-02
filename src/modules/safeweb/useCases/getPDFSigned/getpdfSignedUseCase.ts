import { AppError } from "../../../../errors/AppError";
import { prescriptionCoordinates, urlSafeWeb } from '../../enums/enums';
import { Safewebapi } from '../../requests/Safeweb.api';

interface IResponseStamp {
    certificate_alias: string;
    annotations: [{
        "width": number,
        "height": number,
        "x": number,
        "y": number,
        "page": number
    }]
}

class GetpdfSignedUseCase {

    private safeWebapi: Safewebapi;

    constructor() {
        this.safeWebapi = new Safewebapi();
    }

    async execute({ token, content }): Promise<string> {

        if (!token || !content) {
            throw new AppError("Erro no envio de parametros, tente novamente");
        }

        this.safeWebapi.setToken(token);

        const id = await this.startSubscriptionFlow(content);

        if (id == undefined || id == null) {
            throw new AppError("Erro interno de servidor, tente novamente");
        }

        const stamp = await this.applySignatureStamp(id);

        if (stamp == null || stamp == undefined) {
            throw new AppError("Erro interno de servidor, tente novamente");
        }

        const pdfSigned: { content: string } = await this.safeWebapi.executeRequest({
            method: "GET",
            url: `${urlSafeWeb.FINISH_SIGNATURE}?documentId=${id}`
        });

        if (pdfSigned == undefined || pdfSigned == null) {
            throw new AppError("Erro interno de servidor, tente novamente");
        }

        return pdfSigned.content;

    }

    async startSubscriptionFlow(content: string): Promise<string> {

        const body = {
            file: {
                content
            }
        }

        const initialFlow = await this.safeWebapi.executeRequest({
            method: "POST",
            body,
            url: urlSafeWeb.START_SIGNATURE
        });

        return initialFlow.id as string;
    }

    async applySignatureStamp(id: string): Promise<IResponseStamp | null> {

        const body = {
            id,
            alias: "PRESCRIPTION OF MEDICINES",
            annotations: [{
                ...prescriptionCoordinates,
                "page": 1
            }]
        }

        const stampApplied: IResponseStamp = await this.safeWebapi.executeRequest({
            method: "POST",
            body,
            url: urlSafeWeb.APPLY_STAMP
        });

        if (stampApplied == null && stampApplied == undefined) {
            throw new AppError("Erro interno de servidor, tente novamente");
        }

        return stampApplied;

    }

}


export { GetpdfSignedUseCase };

