"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationRepository_1 = require("../../repositories/AuthorizationRepository");
const updateAuthorizationController_1 = require("./updateAuthorizationController");
const updateAuthorizationUseCase_1 = require("./updateAuthorizationUseCase");
exports.default = () => {
    const authorizationRepository = new AuthorizationRepository_1.AuthorizationRepository();
    const updateAuthorizationUseCase = new updateAuthorizationUseCase_1.UpdateAuthorizationUseCase(authorizationRepository);
    const updateAuthorizationController = new updateAuthorizationController_1.UpdateAuthorizationController(updateAuthorizationUseCase);
    return updateAuthorizationController;
};
