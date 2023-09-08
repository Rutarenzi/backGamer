import express from "express";
import Home from "./api/Home.route";
import Payment from "./api/Payment.route";
import User from "./api/User.route";
import Level from "./api/Level.route";
import Commission from "./api/commission.route";
import Account from "./api/Account.route";
import Survey  from "./api/Survey.route"
import Team from "./api/Team.route"
import AdminStat from "./api/adminStat.route"

const routes = express.Router();

routes.use('/', Home);
routes.use('/payment', Payment)
routes.use("/users",User);
routes.use("/level", Level);
routes.use("/comss",Commission);
routes.use("/account",Account );
routes.use("/survey", Survey);
routes.use("/team", Team);
routes.use("/adminStatistic", AdminStat);




export default routes;