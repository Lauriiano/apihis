import { AppError } from "../../../../errors/AppError";
import { fixedCredentialsHolder, urlSafeWeb } from "../../enums/enums";
import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";
import { Safewebapi } from '../../requests/Safeweb.api';

interface IResponse {
    token: string;
}

interface IResponseCredentialsHolder {
    access_token: string;
    expires_in: number;
    token_type: string;
    slot_alias: string;
    scope?: string;
}

class UserAuthorizationUseCase {

    private safewebapi = new Safewebapi();

    constructor(private authorizationRepository: IAuthorizationRepository) { }


    async execute(cpf: string): Promise<IResponse> {

        if (cpf === "") {
            throw new AppError("cpf inválido");
        }

        const userAuthorized = await this.authorizationRepository.getAuthorization(cpf);

        if (userAuthorized == undefined || userAuthorized == null) { // Solicita autorização ??
            throw new AppError("Usuário não encontrado");
        }


        if (userAuthorized.dta_cri_token != null && this.checkValidToken(userAuthorized.dta_cri_token)) {
            return { token: userAuthorized.access_token };
        }

        if (userAuthorized.expirationDate != null && this.verifyAuthorizationValidate(userAuthorized.expirationDate)) {

            const authorizationCredentials = await this.getCredentialsHolder(userAuthorized, cpf);

            if (authorizationCredentials != null && authorizationCredentials != undefined) {
                await this.authorizationRepository.updateAccessToken({ state: cpf, ...authorizationCredentials });
                return { token: authorizationCredentials.access_token };
            }

            throw new AppError("Erro ao solicitar um novo token, tente novamente.");

        }

        const body = {
            client_id: process.env.CLIENT_ID,
            login_hint: cpf,
            state: cpf
        }

        const authorizationApplication = await this.safewebapi.executeRequest({
            body,
            method: "POST",
            url: urlSafeWeb.AUTHORIZE_CA
        });

        if (authorizationApplication != null && authorizationApplication != undefined) {
            await this.authorizationRepository.inactiveAuthorization(cpf);
            await this.authorizationRepository.create(cpf);
            throw new AppError("token e autorização expirados, nova autorização solicitada. Verifique o seu aplicativo safeweb");
        }

        throw new AppError("token e autorização expirados, erro ao solicitar nova autorização.");
    }

    async getCredentialsHolder(userAuthorized: any, cpf: string): Promise<IResponseCredentialsHolder> {

        const password = userAuthorized.identifierCA + "igualbad12";

        const body = {
            ...fixedCredentialsHolder,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            username: cpf,
            password
        }

        const authorizationCredentials = await this.safewebapi.executeRequest({
            method: "POST",
            url: urlSafeWeb.PWD_AUTHORIZE,
            body
        });

        return authorizationCredentials as IResponseCredentialsHolder;

    }

    checkValidToken(dta_cri_token: Date): boolean {

        const currentDate = new Date().getTime();

        const expirationDate = dta_cri_token.setDate(dta_cri_token.getDate() + 7);

        if (currentDate < expirationDate) {
            return true;
        }

        return false;
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

export { UserAuthorizationUseCase };

