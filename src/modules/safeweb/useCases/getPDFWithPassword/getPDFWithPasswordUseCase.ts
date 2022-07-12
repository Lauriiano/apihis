import { AppError } from "../../../../errors/AppError";
import { fixedCredentialsHolder, urlSafeWeb } from "../../enums/enums";
import { AuthorizationRepository } from '../../repositories/AuthorizationRepository';
import { Safewebapi } from '../../requests/Safeweb.api';
import { GetpdfSignedUseCase } from "../getPDFSigned/getpdfSignedUseCase";

interface IResponseCredentialsHolder {
    access_token: string;
    expires_in: number;
    token_type: string;
    slot_alias: string;
    scope?: string;
}

interface IRequest {
    password: string;
    cpf: string;
    pdfNotSigned: string;
}

class GetpdfWithPasswordUseCase {

    constructor(
        private authorizationRepository: AuthorizationRepository,
        private getpdfSignedUseCase: GetpdfSignedUseCase,
        private safeWebapi = new Safewebapi()
    ) { }

    async execute({ password, cpf, pdfNotSigned }: IRequest): Promise<String> {

        const userAuthorized = await this.authorizationRepository.getAuthorization(cpf);

        if (userAuthorized.identifierCA === null || !this.verifyAuthorizationValidate(userAuthorized.expirationDate)) {
            throw new AppError("Aplicação não autorizada ou expirada, verifique seu aplicativo safeID");
        }

        const reqToken = await this.getCredentialsHolder(userAuthorized, cpf, password);

        if (reqToken != null && reqToken != undefined) {
            await this.authorizationRepository.updateAccessToken({ state: cpf, ...reqToken });
        } else {
            throw new AppError("Erro ao solicitar token, tente novamente");
        }

        const pdfSigned = await this.getpdfSignedUseCase.execute({
            token: reqToken.access_token,
            content: pdfNotSigned
        });

        if (pdfSigned) {
            await this.authorizationRepository.updatePassword({ password, cpf });
            return pdfSigned;
        }

        throw new AppError("Erro interno de sistema, tente novamente");

    }

    async getCredentialsHolder(userAuthorized: any, cpf: string, senha: string): Promise<IResponseCredentialsHolder> {

        const password = userAuthorized.identifierCA + senha;

        const body = {
            ...fixedCredentialsHolder,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: cpf,
            password
        }

        const authorizationCredentials = await this.safeWebapi.executeRequest({
            method: "POST",
            url: urlSafeWeb.PWD_AUTHORIZE,
            body
        });

        return authorizationCredentials as IResponseCredentialsHolder;

    }

    verifyAuthorizationValidate(expirationDate: string): boolean {

        const currentDate = new Date().getTime();
        const expirationDateAuthorization = new Date(expirationDate).getTime();

        if (currentDate < expirationDateAuthorization) {
            return true;
        }

        return false;
    }

}


export { GetpdfWithPasswordUseCase };

