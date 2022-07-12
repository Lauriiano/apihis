import { Router } from "express";
import getpdfSignedController from "../modules/safeweb/useCases/getPDFSigned";
import getpdfWithPasswordController from "../modules/safeweb/useCases/getPDFWithPassword";

const pdfSignedRouter = Router();

pdfSignedRouter.post("/", (req, res) => getpdfSignedController().handle(req, res));
pdfSignedRouter.post("/password", (req, res) => getpdfWithPasswordController().handle(req, res));

export { pdfSignedRouter };

