import { AuthorizationRepository } from "../../repositories/AuthorizationRepository";
import { AuthorizationsListController } from "./AuthorizationsListController";
import { AuthorizationLisUseCase } from "./AuthorizationsListUseCase";

export default () => {
    const authorizationRepository = new AuthorizationRepository();

    const listAuthorizationUseCase = new AuthorizationLisUseCase(authorizationRepository);

    const listAuthorizationController = new AuthorizationsListController(listAuthorizationUseCase);

    return listAuthorizationController;
}


