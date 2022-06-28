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
    create(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization = this.repository.create({ state: cpf });
            yield this.repository.save(authorization);
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizations = yield this.repository.find({ where: { status: 1 } });
            return authorizations;
        });
    }
    getAuthorization(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM authorization_safeweb where state = ${cpf} and status = 1`;
            const authorization = yield this.repository.query(query);
            return authorization[0];
        });
    }
    updateAuthorization({ identifierCA, state, expirationDate, serialNumber, error }) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAuthorization = yield this.repository.find({ where: { state } });
            const authorization = getAuthorization[0];
            authorization.identifierCA = identifierCA;
            authorization.state = state;
            authorization.expirationDate = expirationDate;
            authorization.serialNumber = serialNumber;
            authorization.error = error;
            const authorizationUpdated = yield this.repository.save(authorization);
            return authorizationUpdated;
        });
    }
    updateAccessToken({ access_token, expires_in, slot_alias, state }) {
        return __awaiter(this, void 0, void 0, function* () {
            const getAuthorization = yield this.repository.find({ where: { state } });
            const authorization = getAuthorization[0];
            authorization.dta_cri_token = new Date();
            authorization.access_token = access_token;
            authorization.expires_in = expires_in;
            authorization.slot_alias = slot_alias;
            const authorizationUpdated = yield this.repository.save(authorization);
            return authorizationUpdated;
        });
    }
    inactiveAuthorization(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM authorization_safeweb where state = ${cpf} and status = 1`;
            const authorization = yield this.repository.query(query);
            authorization.status = 0;
            const authorizationUpdated = yield this.repository.save(authorization);
            return authorizationUpdated;
        });
    }
}
exports.AuthorizationRepository = AuthorizationRepository;
