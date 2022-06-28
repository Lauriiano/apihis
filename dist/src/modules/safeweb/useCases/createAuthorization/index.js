"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationRepository_1 = require("../../repositories/AuthorizationRepository");
const CreateAuthorizationController_1 = require("./CreateAuthorizationController");
const CreateAuthorizationUseCase_1 = require("./CreateAuthorizationUseCase");
exports.default = () => {
    const authorizationRepository = new AuthorizationRepository_1.AuthorizationRepository();
    const createAuthorizationUseCase = new CreateAuthorizationUseCase_1.CreateAuthorizationUseCase(authorizationRepository);
    const createAuthorizationController = new CreateAuthorizationController_1.CreateAuthorizationController(createAuthorizationUseCase);
    return createAuthorizationController;
};
