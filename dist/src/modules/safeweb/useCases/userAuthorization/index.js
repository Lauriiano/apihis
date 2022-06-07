"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationRepository_1 = require("../../repositories/AuthorizationRepository");
const userAuthorizationController_1 = require("./userAuthorizationController");
const userAuthorizationUseCase_1 = require("./userAuthorizationUseCase");
exports.default = () => {
    const authorizationRepository = new AuthorizationRepository_1.AuthorizationRepository();
    const userAuthorizationUseCase = new userAuthorizationUseCase_1.UserAuthorizationUseCase(authorizationRepository);
    const userAuthorizationController = new userAuthorizationController_1.UserAuthorizationController(userAuthorizationUseCase);
    return userAuthorizationController;
};
