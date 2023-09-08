import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken";
import TeamController from "../../controllers/TeamController";

const route = Router();

route.get(
    "/",
    verifyToken,
    TeamController.getTeam
);

export default route;