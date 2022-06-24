import { getRepository, Repository } from "typeorm";
import { Authorization } from "../entities/Authorization";
import { IAuthorizationDTO, IAuthorizationRepository, IConfiableAuthorizationApplication, IUpdateAccessToken } from "./implementations/IAuthorizationRepository";




class AuthorizationRepository implements IAuthorizationRepository {

    private repository: Repository<Authorization>;

    constructor() {
        this.repository = getRepository(Authorization)
    }

    async create(cpf: string): Promise<void> {

        const authorization = this.repository.create({ state: cpf });

        await this.repository.save(authorization);
    }

    async list(): Promise<IAuthorizationDTO[]> {
        const authorizations = await this.repository.find({ where: { status: 1 } });
        return authorizations;
    }

    async getAuthorization(cpf: string): Promise<IAuthorizationDTO> {
        const query = `SELECT * FROM authorization_safeweb where state = ${cpf} and status = 1`;
        const authorization = await this.repository.query(query);
        return authorization[0];
    }

    async updateAuthorization({ identifierCA, state, expirationDate, serialNumber, error }: IConfiableAuthorizationApplication): Promise<Authorization> {
        const getAuthorization = await this.repository.find({ where: { state } });

        const authorization = getAuthorization[0];

        authorization.identifierCA = identifierCA;
        authorization.state = state;
        authorization.expirationDate = expirationDate;
        authorization.serialNumber = serialNumber;
        authorization.error = error;

        const authorizationUpdated = await this.repository.save(authorization);

        return authorizationUpdated;

    }

    async updateAccessToken({ access_token, expires_in, slot_alias, state }: IUpdateAccessToken): Promise<IAuthorizationDTO> {
        const getAuthorization = await this.repository.find({ where: { state } });

        const authorization = getAuthorization[0];

        authorization.dta_cri_token = new Date();
        authorization.access_token = access_token;
        authorization.expires_in = expires_in;
        authorization.slot_alias = slot_alias;

        const authorizationUpdated = await this.repository.save(authorization);

        return authorizationUpdated;
    }

    async inactiveAuthorization(cpf: string): Promise<IAuthorizationDTO> {
        const query = `SELECT * FROM authorization_safeweb where state = ${cpf} and status = 1`;
        const authorization = await this.repository.query(query);

        authorization.status = 0;

        const authorizationUpdated = await this.repository.save(authorization);

        return authorizationUpdated;
    }

}

export { AuthorizationRepository };

