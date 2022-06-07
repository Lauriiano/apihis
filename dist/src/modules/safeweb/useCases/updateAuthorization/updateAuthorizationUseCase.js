"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthorizationUseCase = void 0;
class UpdateAuthorizationUseCase {
    constructor(authorizationRepository) {
        this.authorizationRepository = authorizationRepository;
    }
    execute({ identifierCA, serialNumber, expirationDate, state, cpf }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!identifierCA || !serialNumber || !expirationDate || !state || !cpf) {
                throw new Error("todos os parametros são obreigatórios");
            }
            this.authorizationRepository.updateAuthorization({ identifierCA, serialNumber, expirationDate, state, cpf });
        });
    }
}
exports.UpdateAuthorizationUseCase = UpdateAuthorizationUseCase;
