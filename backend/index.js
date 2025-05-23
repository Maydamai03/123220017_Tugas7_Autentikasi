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


app.use(cors({ credentials: true, origin: 'https://fe-may-t7-dot-projekcc017033.uc.r.appspot.com' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(AuthRoutes);

app.listen(5000, () => console.log('Server up and running on http://localhost:5000'));
