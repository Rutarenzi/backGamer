import { Router } from "express";
import ComController from "../../controllers/ComController";
import verifyToken from "../../middlewares/verifyToken";
import verifyComss from "../../middlewares/verifyComss";


const route = Router();

route.get(
   "/",
   verifyToken,
   verifyComss,
  ComController.calculate

);

export default route;


