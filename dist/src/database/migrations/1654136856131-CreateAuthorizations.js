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
exports.CreateAuthorizations1654136856131 = void 0;
const typeorm_1 = require("typeorm");
class CreateAuthorizations1654136856131 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "authorization_safeweb",
                columns: [
                    { name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: "created_at", type: "datetime", default: "GETDATE()" },
                    { name: "identifierCA", type: "varchar", isNullable: true, default: null },
                    { name: "state", type: "varchar", isNullable: true, default: null },
                    { name: "expirationDate", type: "varchar", isNullable: true, default: null },
                    { name: "serialNumber", type: "varchar", isNullable: true, default: null },
                    { name: "dta_cri_token", type: "datetime", isNullable: true, default: null },
                    { name: "access_token", type: "varchar", isNullable: true, default: null },
                    { name: "expires_in", type: "INT", isNullable: true, default: null },
                    { name: "slot_alias", type: "varchar", isNullable: true, default: null },
                    { name: "error", type: "varchar", isNullable: true, default: null },
                    { name: "status", type: "BIT", default: 1 },
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("authorization_safeweb");
        });
    }
}
exports.CreateAuthorizations1654136856131 = CreateAuthorizations1654136856131;
