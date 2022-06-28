import { AuthorizationRepository } from "../../repositories/AuthorizationRepository";
import { UpdateAuthorizationController } from "./updateAuthorizationController";
import { UpdateAuthorizationUseCase } from "./updateAuthorizationUseCase";


export default (): UpdateAuthorizationController => {

    const authorizationRepository = new AuthorizationRepository();

    const updateAuthorizationUseCase = new UpdateAuthorizationUseCase(authorizationRepository);

    const updateAuthorizationController = new UpdateAuthorizationController(updateAuthorizationUseCase);

    return updateAuthorizationController;

}