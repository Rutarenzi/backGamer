import express from "express";
import morgan from "morgan";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
const path = require('path');
import "dotenv/config";
import "./events/EventHandler";
import AllRoutes from "./routes/index";
import notfound from "./controllers/NotFound";
import documentation from "./documentation/index";
import Static from "./routes/static/static.route"



const app = express();
const publicer = path.join(__dirname,"/public/game");
app.use(express.static(publicer));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(cors());
app.use(cookieParser())

app.use(express.json())
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/docs", documentation)
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

try{
    app.use("/api/v1", AllRoutes);
    app.use("/gamer",Static)
    app.all("*",notfound);
} catch(error){
    console.log(error);
}


export default app;