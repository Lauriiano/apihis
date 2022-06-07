"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "type": "mssql",
    "host": process.env.HOST.toString(),
    "port": parseInt(process.env.PORT_DB),
    "username": process.env.USER.toString(),
    "password": process.env.PASSWORD.toString(),
    "database": process.env.DATABASE.toString(),
    "migrations": [
        "./src/database/migrations/*.ts"
    ],
    "cli": {
        "migrationsDir": "./src/database/migrations"
    },
    "entities": [
        "./src/modules/**/entities/*.ts"
    ],
    "options": {
        "encrypt": false
    }
};
