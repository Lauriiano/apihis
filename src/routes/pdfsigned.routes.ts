import { Router } from "express";
import getpdfSignedController from "../modules/safeweb/useCases/getPDFSigned";
;

const pdfSignedRouter = Router();

pdfSignedRouter.post("/", (req, res) => getpdfSignedController().handle(req, res));

export { pdfSignedRouter };

