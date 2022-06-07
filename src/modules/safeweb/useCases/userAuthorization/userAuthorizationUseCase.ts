import { IAuthorizationDTO, IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";


class UserAuthorizationUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    async execute(cpf: string): Promise<IAuthorizationDTO[]> {
        const userAuthorized = await this.authorizationRepository.getAuthorization(cpf);
        return userAuthorized;
    }

}

export { UserAuthorizationUseCase };

