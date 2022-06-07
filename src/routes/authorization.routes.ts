import { Router } from "express";
import listAuthorizationController from "../modules/safeweb/useCases/authorizationsList";
import createAuthorizationController from "../modules/safeweb/useCases/createAuthorization";
import updateAuthorizationController from "../modules/safeweb/useCases/updateAuthorization";
import userAuthorizationController from "../modules/safeweb/useCases/userAuthorization";

const auhtorizationRoutes = Router();

auhtorizationRoutes.post("/createAuthorization", (req, res) => createAuthorizationController().handle(req, res));

auhtorizationRoutes.get("/", (req, res) => listAuthorizationController().handle(req, res));

auhtorizationRoutes.post("/getAuthorization", (req, res) => userAuthorizationController().handle(req, res));

auhtorizationRoutes.put("/", (req, res) => updateAuthorizationController().handle(req, res)); //updateAuthorization

export { auhtorizationRoutes };

