import { Router } from  "express";
import AccountController from "../../controllers/AccountController";
import verifyToken from "../../middlewares/verifyToken";
import AmountCheck from "../../middlewares/amountCheck";
import withdrawValidate from "../../validation/amountValid";
import userFound from "../../middlewares/userExist";

const route = Router();

route.get(
    "/",
    verifyToken,
    AccountController.getAccount
);
route.patch("/",
withdrawValidate,
verifyToken,
AmountCheck,
userFound,
AccountController.withdraw
);
export default route


