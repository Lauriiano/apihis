"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthorizationUseCase = void 0;
const AppError_1 = require("../../../../errors/AppError");
class CreateAuthorizationUseCase {
    constructor(authorizationRepository) {
        this.authorizationRepository = authorizationRepository;
    }
    execute({ cpf }) {
        if (cpf === "") { //precisa vir o CPF
            throw new AppError_1.AppError("CPF não enviado");
        }
        this.authorizationRepository.create(cpf);
    }
}
exports.CreateAuthorizationUseCase = CreateAuthorizationUseCase;
