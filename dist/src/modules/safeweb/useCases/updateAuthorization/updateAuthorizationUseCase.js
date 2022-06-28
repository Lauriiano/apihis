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
const AppError_1 = require("../../../../errors/AppError");
const Safeweb_api_1 = require("../../requests/Safeweb.api");
class UpdateAuthorizationUseCase {
    constructor(authorizationRepository) {
        this.authorizationRepository = authorizationRepository;
    }
    execute({ identifierCA, serialNumber, expirationDate, state, error }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationUpdated = yield this.authorizationRepository.updateAuthorization({ identifierCA, serialNumber, expirationDate, state, error });
            if (authorizationUpdated.identifierCA && authorizationUpdated.serialNumber && authorizationUpdated.expirationDate && authorizationUpdated.state) {
                const reqToken = yield Safeweb_api_1.safewebapi.authorizationCredentialsHolder({ username: "TESTE USERNAME", password: "TESTE PASSWORD" });
                const { access_token, token_type, expires_in, slot_alias } = reqToken;
                if (access_token && token_type && expires_in && slot_alias) {
                    yield this.authorizationRepository.updateAccessToken(Object.assign({ state: authorizationUpdated.state }, reqToken));
                }
                else {
                    throw new AppError_1.AppError("Erro interno de servidor, tente novamente.");
                }
            }
            else {
                throw new AppError_1.AppError("Erro interno de servidor, tente novamente.");
            }
        });
    }
}
exports.UpdateAuthorizationUseCase = UpdateAuthorizationUseCase;
