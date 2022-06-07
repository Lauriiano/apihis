import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";

interface IRequest {
    identifierCA: string;
    serialNumber: string;
    expirationDate: string;
    state: string;
    cpf: string;
}

class CreateAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    execute({ identifierCA, serialNumber, expirationDate, state, cpf }: IRequest): void {
        this.authorizationRepository.create({ identifierCA, serialNumber, state, expirationDate, cpf });
    }

}

export { CreateAuthorizationUseCase };

