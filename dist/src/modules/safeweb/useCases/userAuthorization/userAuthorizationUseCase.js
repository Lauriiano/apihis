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
exports.UserAuthorizationUseCase = void 0;
const AppError_1 = require("../../../../errors/AppError");
const Safeweb_api_1 = require("../../requests/Safeweb.api");
class UserAuthorizationUseCase {
    constructor(authorizationRepository) {
        this.authorizationRepository = authorizationRepository;
    }
    execute(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cpf === "") {
                throw new AppError_1.AppError("cpf inválido");
            }
            const userAuthorized = yield this.authorizationRepository.getAuthorization(cpf);
            if (userAuthorized == undefined) { // Solicita autorização ??
                throw new AppError_1.AppError("Usuário não encontrado");
            }
            const client_id = process.env.CLIENT_ID;
            const client_secret = process.env.CLIENT_SECRET;
            if (userAuthorized.dta_cri_token != null && this.checkValidToken(userAuthorized.dta_cri_token)) {
                return { token: userAuthorized.access_token };
            }
            if (userAuthorized.expirationDate != null && this.verifyAuthorizationValidate(userAuthorized.expirationDate)) {
                const password = userAuthorized.identifierCA + "SENHA DO CERTIFICADO DIGITAL ???";
                const authorizationCredentials = yield Safeweb_api_1.safewebapi.authorizationCredentialsHolder({ username: cpf, password });
                const { access_token, token_type, expires_in, scope, slot_alias } = authorizationCredentials;
                if (access_token && token_type && expires_in && slot_alias) {
                    yield this.authorizationRepository.updateAccessToken(Object.assign({ state: cpf }, authorizationCredentials));
                    return { token: access_token };
                }
                throw new AppError_1.AppError("Erro ao solicitar um novo token, tente novamente.");
            }
            const authorizationApplication = yield Safeweb_api_1.safewebapi.confiableApplicationAuthorization({ client_id, cpf });
            if (authorizationApplication) {
                yield this.authorizationRepository.inactiveAuthorization(cpf);
                yield this.authorizationRepository.create(cpf);
                throw new AppError_1.AppError("token e autorização expirados, nova autorização solicitada. Verifique o seu aplicativo safeweb");
            }
            throw new AppError_1.AppError("token e autorização expirados, erro ao solicitar nova autorização.");
        });
    }
    checkValidToken(dta_cri_token) {
        const currentDate = new Date().getTime();
        const expirationDate = dta_cri_token.setDate(dta_cri_token.getDate() + 7);
        if (currentDate < expirationDate) {
            return true;
        }
        return false;
    }
    verifyAuthorizationValidate(expirationDate) {
        const currentDate = new Date().getTime();
        const expirationDateAuthorization = new Date(expirationDate).getTime();
        if (currentDate < expirationDateAuthorization) {
            return true;
        }
        return false;
    }
}
exports.UserAuthorizationUseCase = UserAuthorizationUseCase;
