import { AppError } from "../../../../errors/AppError";
import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";
import { safewebapi } from "../../requests/Safeweb.api";

interface IRequest {
    identifierCA: string;
    serialNumber: string;
    expirationDate: string;
    state: string;
    error: string;
}

class UpdateAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    async execute({ identifierCA, serialNumber, expirationDate, state, error }: IRequest): Promise<void | Error> {

        const authorizationUpdated = await this.authorizationRepository.updateAuthorization({ identifierCA, serialNumber, expirationDate, state, error });

        if (authorizationUpdated.identifierCA && authorizationUpdated.serialNumber && authorizationUpdated.expirationDate && authorizationUpdated.state) {

            const reqToken = await safewebapi.authorizationCredentialsHolder({ username: "TESTE USERNAME", password: "TESTE PASSWORD" });

            const { access_token, token_type, expires_in, slot_alias } = reqToken;

            if (access_token && token_type && expires_in && slot_alias) {
                await this.authorizationRepository.updateAccessToken({ state: authorizationUpdated.state, ...reqToken });
            } else {
                throw new AppError("Erro interno de servidor, tente novamente.");
            }

        } else {
            throw new AppError("Erro interno de servidor, tente novamente.");
        }

    }

}

export { UpdateAuthorizationUseCase };

