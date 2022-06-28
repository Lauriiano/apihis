"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auhtorizationRoutes = void 0;
const express_1 = require("express");
const authorizationsList_1 = __importDefault(require("../modules/safeweb/useCases/authorizationsList"));
const createAuthorization_1 = __importDefault(require("../modules/safeweb/useCases/createAuthorization"));
const updateAuthorization_1 = __importDefault(require("../modules/safeweb/useCases/updateAuthorization"));
const userAuthorization_1 = __importDefault(require("../modules/safeweb/useCases/userAuthorization"));
const auhtorizationRoutes = (0, express_1.Router)();
exports.auhtorizationRoutes = auhtorizationRoutes;
auhtorizationRoutes.post("/createAuthorization", (req, res) => (0, createAuthorization_1.default)().handle(req, res)); // cadastra o cpf no banco para aguardar resposta da safeweb
auhtorizationRoutes.get("/", (req, res) => (0, authorizationsList_1.default)().handle(req, res)); // lista todas as autorizações ativas
auhtorizationRoutes.post("/getAuthorization", (req, res) => (0, userAuthorization_1.default)().handle(req, res)); //Retorna token do usuario se tiver ativo, se nao tiver solicita
auhtorizationRoutes.post("/", (req, res) => (0, updateAuthorization_1.default)().handle(req, res)); //updateAuthorization => rota que o safeweb irá utilizar
