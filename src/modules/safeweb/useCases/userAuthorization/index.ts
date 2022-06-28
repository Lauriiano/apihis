import { AuthorizationRepository } from "../../repositories/AuthorizationRepository";
import { UserAuthorizationController } from "./userAuthorizationController";
import { UserAuthorizationUseCase } from "./userAuthorizationUseCase";


export default (): UserAuthorizationController => {

    const authorizationRepository = new AuthorizationRepository();

    const userAuthorizationUseCase = new UserAuthorizationUseCase(authorizationRepository);

    const userAuthorizationController = new UserAuthorizationController(userAuthorizationUseCase);

    return userAuthorizationController;

}