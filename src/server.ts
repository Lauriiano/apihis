import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import "./database";
import { router } from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);


app.use('/', (req, res) => {
    res.json({ msg: 'Rota de teste' })
});

// https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'sslcert', 'pepvita.key'), 'utf8'),
//     cert: fs.readFileSync(path.join(__dirname, 'sslcert', 'pepvita.crt'), 'utf8')
// }, app).listen(process.env.PORT, () => {
//     console.log(`Servidor ok, porta: ${process.env.PORT}`);
// });

app.listen(process.env.PORT, () => console.log("Server is running in port " + process.env.PORT));