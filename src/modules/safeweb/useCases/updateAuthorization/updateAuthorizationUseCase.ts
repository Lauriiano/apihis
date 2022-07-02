import { AppError } from "../../../../errors/AppError";
import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";
import { Safewebapi } from "../../requests/Safeweb.api";
import { fixedCredentialsHolder, urlSafeWeb } from './../../enums/enums';


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

        if (authorizationUpdated && authorizationUpdated.error == null) {

            const body = {
                ...fixedCredentialsHolder,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                username: state,
                password: identifierCA + "igualbad12"
            }

            const safeRequest = new Safewebapi();

            const reqToken = await safeRequest.executeRequest({ body, method: "POST", url: urlSafeWeb.AUTHORIZE_CA });

            if (reqToken != null && reqToken != undefined) {
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

