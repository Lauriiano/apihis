import { AuthorizationRepository } from "../../repositories/AuthorizationRepository";
import { CreateAuthorizationController } from "./CreateAuthorizationController";
import { CreateAuthorizationUseCase } from "./CreateAuthorizationUseCase";

export default (): CreateAuthorizationController => {

    const authorizationRepository = new AuthorizationRepository();

    const createAuthorizationUseCase = new CreateAuthorizationUseCase(authorizationRepository);

    const createAuthorizationController = new CreateAuthorizationController(createAuthorizationUseCase);

    return createAuthorizationController;
}
