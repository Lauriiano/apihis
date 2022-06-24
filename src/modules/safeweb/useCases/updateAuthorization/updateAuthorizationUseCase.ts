import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";

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

        this.authorizationRepository.updateAuthorization({ identifierCA, serialNumber, expirationDate, state, error });

    }

}

export { UpdateAuthorizationUseCase };

