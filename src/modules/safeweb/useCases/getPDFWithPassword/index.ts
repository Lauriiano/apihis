import { AuthorizationRepository } from "../../repositories/AuthorizationRepository";
import { GetpdfSignedUseCase } from "../getPDFSigned/getpdfSignedUseCase";
import { GetpdfWithPasswordController } from "./getPDFWithPasswordController";
import { GetpdfWithPasswordUseCase } from "./getPDFWithPasswordUseCase";


export default (): GetpdfWithPasswordController => {

    const authorizationRepository = new AuthorizationRepository();

    const getpdfSignedUseCase = new GetpdfSignedUseCase();

    const getpdfWithPassUseCase = new GetpdfWithPasswordUseCase(authorizationRepository, getpdfSignedUseCase);

    const getpdfWithPasswordController = new GetpdfWithPasswordController(getpdfWithPassUseCase);

    return getpdfWithPasswordController;

}