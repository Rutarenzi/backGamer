import { Router } from "express";
import SurveyController from "../../controllers/SurveyController";
import verifyToken from "../../middlewares/verifyToken";
import SurveyValidate from "../../validation/surveyValid";
import verifyAmount from "../../middlewares/verifyAmount";
import verifyComss from "../../middlewares/verifyComss";
import cloudCheck from "../../middlewares/cloudCheck";

const route = Router();
route.post(
    "/",
    cloudCheck("image"),
    SurveyValidate,
    verifyToken,
    SurveyController.createSurvey
);
route.get(
    "/",
    verifyToken,
    verifyAmount,
    verifyComss,
    SurveyController.getSurvey
)
export default route;

