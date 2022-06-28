import { AppError } from "../../../../errors/AppError";
import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";
import { safewebapi } from '../../requests/Safeweb.api';

interface IResponse {
    token: string;
}

class UserAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    async execute(cpf: string): Promise<IResponse> {

        if (cpf === "") {
            throw new AppError("cpf inválido");
        }

        const userAuthorized = await this.authorizationRepository.getAuthorization(cpf);

        if (userAuthorized == undefined) { // Solicita autorização ??
            throw new AppError("Usuário não encontrado");
        }

        const client_id = process.env.CLIENT_ID;
        const client_secret = process.env.CLIENT_SECRET;

        if (userAuthorized.dta_cri_token != null && this.checkValidToken(userAuthorized.dta_cri_token)) {
            return { token: userAuthorized.access_token };
        }

        if (userAuthorized.expirationDate != null && this.verifyAuthorizationValidate(userAuthorized.expirationDate)) {
            const password = userAuthorized.identifierCA + "SENHA DO CERTIFICADO DIGITAL ???";

            const authorizationCredentials = await safewebapi.authorizationCredentialsHolder({ username: cpf, password });

            const { access_token, token_type, expires_in, scope, slot_alias } = authorizationCredentials;

            if (access_token && token_type && expires_in && slot_alias) {
                await this.authorizationRepository.updateAccessToken({ state: cpf, ...authorizationCredentials });
                return { token: access_token };
            }

            throw new AppError("Erro ao solicitar um novo token, tente novamente.");

        }

        const authorizationApplication = await safewebapi.confiableApplicationAuthorization({ client_id, cpf });

        if (authorizationApplication) {
            await this.authorizationRepository.inactiveAuthorization(cpf);
            await this.authorizationRepository.create(cpf);
            throw new AppError("token e autorização expirados, nova autorização solicitada. Verifique o seu aplicativo safeweb");
        }

        throw new AppError("token e autorização expirados, erro ao solicitar nova autorização.");
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

