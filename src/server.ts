import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "./database";
import { AppError } from './errors/AppError';
import { router } from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.error,
            message: err.message
        });
    }

    return res.status(500).json({
        status: "Error",
        message: `Erro interno do servidor: ${err.message}`
    })
})

// https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'sslcert', 'pepvita.key'), 'utf8'),
//     cert: fs.readFileSync(path.join(__dirname, 'sslcert', 'pepvita.crt'), 'utf8')
// }, app).listen(process.env.PORT, () => {
//     console.log(`Servidor ok, porta: ${process.env.PORT}`);
// });

app.listen(process.env.PORT, () => console.log("Server is running in port " + process.env.PORT));