import { IAuthorizationDTO, IAuthorizationRepository } from "../../repositories/implementations/IAuthorizationRepository";

class AuthorizationLisUseCase {

    constructor(private authorizationRepository: IAuthorizationRepository) { }

    async execute(): Promise<IAuthorizationDTO[]> {
        const authorizations = await this.authorizationRepository.list();
        return authorizations;
    }

}

export { AuthorizationLisUseCase };

