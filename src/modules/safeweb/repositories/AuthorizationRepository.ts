import { getRepository, Repository } from "typeorm";
import { Authorization } from "../entities/Authorization";
import { IAuthorizationDTO, IAuthorizationRepository } from "./implementations/IAuthorizationRepository";


class AuthorizationRepository implements IAuthorizationRepository {

    private repository: Repository<Authorization>;

    constructor() {
        this.repository = getRepository(Authorization)
    }

    async create({ identifierCA, state, serialNumber, expirationDate }: IAuthorizationDTO): Promise<void> {

        const authorization = this.repository.create({
            identifierCA,
            state,
            serialNumber,
            expirationDate
        });

        await this.repository.save(authorization);
    }

    async list(): Promise<IAuthorizationDTO[]> {
        const authorizations = await this.repository.find();
        return authorizations;
    }

    async getAuthorization(cpf: string): Promise<Authorization[]> {
        const authorization = await this.repository.find({ where: { state: cpf } });
        return authorization
    }

    async updateAuthorization({ identifierCA, state, expirationDate, serialNumber }: IAuthorizationDTO): Promise<void> {
        const getAuthorization = await this.repository.find({ where: { state } });

        const authorization = getAuthorization[0];

        authorization.identifierCA = identifierCA;
        authorization.state = state;
        authorization.expirationDate = expirationDate;
        authorization.serialNumber = serialNumber;

        const teste = await this.repository.save(authorization);

        console.log(teste);

    }

}

export { AuthorizationRepository };

