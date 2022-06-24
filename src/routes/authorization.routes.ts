import { Router } from "express";
import listAuthorizationController from "../modules/safeweb/useCases/authorizationsList";
import createAuthorizationController from "../modules/safeweb/useCases/createAuthorization";
import updateAuthorizationController from "../modules/safeweb/useCases/updateAuthorization";
import userAuthorizationController from "../modules/safeweb/useCases/userAuthorization";

const auhtorizationRoutes = Router();

auhtorizationRoutes.post("/createAuthorization", (req, res) => createAuthorizationController().handle(req, res)); // cadastra o cpf no banco para aguardar resposta da safeweb

auhtorizationRoutes.get("/", (req, res) => listAuthorizationController().handle(req, res)); // lista todas as autorizações ativas

auhtorizationRoutes.post("/getAuthorization", (req, res) => userAuthorizationController().handle(req, res)); //Retorna token do usuario se tiver ativo, se nao tiver solicita

auhtorizationRoutes.post("/", (req, res) => updateAuthorizationController().handle(req, res)); //updateAuthorization => rota que o safeweb irá utilizar

export { auhtorizationRoutes };

