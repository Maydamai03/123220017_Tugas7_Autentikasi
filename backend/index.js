import express from "express";
import cors from "cors";
import { json } from "sequelize";
import router from "./routes/UserRoute.js"
import AuthRoutes from "./routes/AuthRoute.js";
import "./models/AuthModel.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 

dotenv.config();
const app = express();


app.use(cors({ credentials: true, origin: 'http://127.0.0.1:5500' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(AuthRoutes);

app.listen(5000, () => console.log('Server up and running on http://localhost:5000'));
