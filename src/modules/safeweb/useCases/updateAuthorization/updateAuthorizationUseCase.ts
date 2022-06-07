import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";

interface IRequest {
    identifierCA: string;
    serialNumber: string;
    expirationDate: string;
    state: string;
    cpf: string;
}

class UpdateAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    async execute({ identifierCA, serialNumber, expirationDate, state, cpf }: IRequest): Promise<void | Error> {

        if (!identifierCA || !serialNumber || !expirationDate || !state || !cpf) {
            throw new Error("todos os parametros são obreigatórios");
        }

        this.authorizationRepository.updateAuthorization({ identifierCA, serialNumber, expirationDate, state, cpf });
    }

}

export { UpdateAuthorizationUseCase };

