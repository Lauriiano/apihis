"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthorizationUseCase = void 0;
class CreateAuthorizationUseCase {
    constructor(authorizationRepository) {
        this.authorizationRepository = authorizationRepository;
    }
    execute({ identifierCA, serialNumber, expirationDate, state, cpf }) {
        this.authorizationRepository.create({ identifierCA, serialNumber, state, expirationDate, cpf });
    }
}
exports.CreateAuthorizationUseCase = CreateAuthorizationUseCase;
