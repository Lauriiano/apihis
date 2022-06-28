"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
require("./database");
const AppError_1 = require("./errors/AppError");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(routes_1.router);
app.use((err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            error: err.error,
            message: err.message
        });
    }
    return res.status(500).json({
        status: "Error",
        message: `Erro interno do servidor: ${err.message}`
    });
});
// https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'sslcert', 'pepvita.key'), 'utf8'),
//     cert: fs.readFileSync(path.join(__dirname, 'sslcert', 'pepvita.crt'), 'utf8')
// }, app).listen(process.env.PORT, () => {
//     console.log(`Servidor ok, porta: ${process.env.PORT}`);
// });
app.listen(process.env.PORT, () => console.log("Server is running in port " + process.env.PORT));
