import { Authorization } from "../../entities/Authorization";

interface IAuthorizationDTO {
    identifierCA: string | null;
    state: string | null;
    expirationDate: string;
    serialNumber: string | null;
    dta_cri_token: Date | null;
    access_token: string | null;
    expires_in: number | null;
    slot_alias: string | null;
    status: number;
    created_at: Date;
}

interface IConfiableAuthorizationApplication {
    identifierCA: string,
    state: string,
    expirationDate: string,
    serialNumber: string,
    error: string;
}

interface IUpdateAccessToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    slot_alias: string;
    state: string;
}

interface IAuthorizationRepository {

    create(cpf: string): Promise<void>;
    list(): Promise<IAuthorizationDTO[]>;
    getAuthorization(state: string): Promise<IAuthorizationDTO>;
    updateAuthorization({ identifierCA, state, expirationDate, serialNumber }: IConfiableAuthorizationApplication): Promise<Authorization>;
    updateAccessToken({ access_token, expires_in, token_type, slot_alias }: IUpdateAccessToken): Promise<IAuthorizationDTO>;
    inactiveAuthorization(state: string): Promise<IAuthorizationDTO>;
}

export { IAuthorizationDTO, IAuthorizationRepository, IConfiableAuthorizationApplication, IUpdateAccessToken };

