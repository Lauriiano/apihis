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
exports.safewebapi = void 0;
const AppError_1 = require("../../../errors/AppError");
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const safewebapi = {
    authorizationCredentialsHolder: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = data;
        const url = "https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/pwd_authorize";
        //fixed values
        const scope = "signature_session";
        const lifetime = 604800; // seven days in seconds
        const grant_type = "password";
        const body = { grant_type, CLIENT_ID, CLIENT_SECRET, username, password, lifetime, scope };
        const main = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        };
        console.log(main, "MAIN authorizationCredentialsHolder");
        //para testes:
        const access_token = "acces_token teste safewebapi";
        const expires_in = 604800;
        const token_type = "token type teste";
        const slot_alias = "slot alias teste";
        try {
            /*const req = await fetch(url, main);
            const json = await req.json();
            return json;*/
            return { access_token, expires_in, token_type, slot_alias };
        }
        catch (e) {
            throw new AppError_1.AppError("Erro ao solicitar novo token, verificar com safeweb");
        }
    }),
    confiableApplicationAuthorization: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { cpf: login_hint } = data;
        const state = login_hint;
        const url = "https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/authorize-ca";
        const body = { CLIENT_ID, login_hint, state };
        const main = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        };
        console.log(main, "MAIN");
        try {
            /*const req = await fetch(url, main);
            const json = await req.json();
            if (json.content && json.status == 200) {
                return true;
            }*/
            return true;
        }
        catch (e) {
            throw new AppError_1.AppError("Erro ao solicitar nova autorização, verificar com safeweb");
        }
        return false;
    })
};
exports.safewebapi = safewebapi;
