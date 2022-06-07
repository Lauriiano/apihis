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
exports.AuthorizationRepository = void 0;
const typeorm_1 = require("typeorm");
const Authorization_1 = require("../entities/Authorization");
class AuthorizationRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Authorization_1.Authorization);
    }
    create({ identifierCA, state, serialNumber, expirationDate, cpf }) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = this.repository.create({
                identifierCA,
                state,
                serialNumber,
                expirationDate,
                cpf
            });
            yield this.repository.save(authorization);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizations = yield this.repository.find();
            return authorizations;
        });
    }
    getAuthorization(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = yield this.repository.find({ where: { cpf } });
            return authorization;
        });
    }
    updateAuthorization({ identifierCA, state, expirationDate, serialNumber, cpf }) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAuthorization = yield this.repository.find({ where: { cpf } });
            const authorization = getAuthorization[0];
            authorization.identifierCA = identifierCA;
            authorization.state = state;
            authorization.expirationDate = expirationDate;
            authorization.serialNumber = serialNumber;
            const teste = yield this.repository.save(authorization);
            console.log(teste);
        });
    }
}
exports.AuthorizationRepository = AuthorizationRepository;
