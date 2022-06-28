"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthorizationRepository_1 = require("../../repositories/AuthorizationRepository");
const AuthorizationsListController_1 = require("./AuthorizationsListController");
const AuthorizationsListUseCase_1 = require("./AuthorizationsListUseCase");
exports.default = () => {
    const authorizationRepository = new AuthorizationRepository_1.AuthorizationRepository();
    const listAuthorizationUseCase = new AuthorizationsListUseCase_1.AuthorizationLisUseCase(authorizationRepository);
    const listAuthorizationController = new AuthorizationsListController_1.AuthorizationsListController(listAuthorizationUseCase);
    return listAuthorizationController;
};
