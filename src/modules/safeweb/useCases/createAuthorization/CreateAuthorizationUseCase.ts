import { AppError } from "../../../../errors/AppError";
import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";

interface IRequest {
    identifierCA: string;
    serialNumber: string;
    expirationDate: string;
    state: string;
}

class CreateAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    execute({ identifierCA, serialNumber, expirationDate, state }: IRequest): void {

        if (state == "") { //precisa vir o CPF
            throw new AppError("atributo state obrigatório");
        }

        this.authorizationRepository.create({ identifierCA, serialNumber, state, expirationDate });
    }

}

export { CreateAuthorizationUseCase };

