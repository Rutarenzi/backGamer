import { Router } from "express";
import LevelController from "../../controllers/LevelController";
import verifyToken from "../../middlewares/verifyToken";
import cloudCheck from "../../middlewares/cloudCheck";
import LevelValidate from "../../validation/LevelValid";
const route = Router();

route.post(
    "/",
    
    cloudCheck('image'),
    LevelValidate,
    verifyToken,
    LevelController.levelCreate
    );
route.get(
    "/",
    verifyToken,
    LevelController.getLevel
    );
route.get(
    "/:id",
    verifyToken,
    LevelController.oneLevel
);
route.patch(
    "/:id",
    cloudCheck('image'),
    LevelValidate,
    verifyToken,
    LevelController.editLevel
);
route.delete(
    "/:id",
    verifyToken,
    LevelController.deleteLevel
)

export default route;
