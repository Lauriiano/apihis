import { AppError } from "../../../../errors/AppError";
import { IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";

/*interface IRequest {
    identifierCA: string;
    serialNumber: string;
    expirationDate: string;
    state: string;
}*/

interface IRequest {
    cpf: string
}

class CreateAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    execute({ cpf }: IRequest): void {

        if (cpf === "") { //precisa vir o CPF
            throw new AppError("CPF não enviado");
        }

        this.authorizationRepository.create(cpf);
    }

}

export { CreateAuthorizationUseCase };

