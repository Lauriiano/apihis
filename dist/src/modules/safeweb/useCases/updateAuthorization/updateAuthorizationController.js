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
exports.UpdateAuthorizationController = void 0;
class UpdateAuthorizationController {
    constructor(updateAuthorizationUseCase) {
        this.updateAuthorizationUseCase = updateAuthorizationUseCase;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { identifierCA, state, serialNumber, expirationDate, cpf = "" } = req.body;
            try {
                yield this.updateAuthorizationUseCase.execute({ identifierCA, state, serialNumber, expirationDate, cpf });
            }
            catch (error) {
                return res.json({ error: "Erro ao fazer o update, verifique todos os parametros" });
            }
            return res.json({ msg: "update realizado sucesso" });
        });
    }
}
exports.UpdateAuthorizationController = UpdateAuthorizationController;
