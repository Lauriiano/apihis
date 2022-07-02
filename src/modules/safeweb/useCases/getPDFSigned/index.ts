import { GetpdfSignedController } from "./getpdfSignedController";
import { GetpdfSignedUseCase } from "./getpdfSignedUseCase";


export default (): GetpdfSignedController => {

    const getpdfSignedUseCase = new GetpdfSignedUseCase();

    const getpdfSignedController = new GetpdfSignedController(getpdfSignedUseCase);

    return getpdfSignedController;

}