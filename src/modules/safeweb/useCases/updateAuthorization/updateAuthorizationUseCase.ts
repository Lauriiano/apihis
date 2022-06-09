import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";

interface IRequest {
    identifierCA: string;
    serialNumber: string;
    expirationDate: string;
    state: string;
}

class UpdateAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    async execute({ identifierCA, serialNumber, expirationDate, state }: IRequest): Promise<void | Error> {

        /*if (!identifierCA || !serialNumber || !expirationDate || !state) {
            throw new AppError("todos os parametros são obrigatórios", 401);
        }*/

        this.authorizationRepository.updateAuthorization({ identifierCA, serialNumber, expirationDate, state });
    }

}

export { UpdateAuthorizationUseCase };

