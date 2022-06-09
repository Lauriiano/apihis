import { Authorization } from "../../entities/Authorization";

interface IAuthorizationDTO {
    identifierCA: string;
    state: string;
    expirationDate: string;
    serialNumber: string;
}

interface IAuthorizationRepository {

    create({ identifierCA, state, expirationDate, serialNumber }: IAuthorizationDTO): Promise<void>;
    list(): Promise<IAuthorizationDTO[]>;
    getAuthorization(serialNumber: string): Promise<Authorization[]>;
    updateAuthorization({ identifierCA, state, expirationDate, serialNumber }: IAuthorizationDTO): Promise<void>;

}

export { IAuthorizationDTO, IAuthorizationRepository };

