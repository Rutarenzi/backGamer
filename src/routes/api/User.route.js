import { Router } from "express";
import UserController from "../../controllers/UserController";
import userExist from "../../middlewares/usernameTaken";
import referalCheck from "../../middlewares/referalNotExist";
import findUser from "../../middlewares/findUser";
import checkPswd from "../../middlewares/checkPswd";
import verifyToken from "../../middlewares/verifyToken";
import registerValidate from "../../validation/registerValid";
import loginValidate from "../../validation/loginValid";
import userFound from "../../middlewares/userExist"
const route = Router();

route.post('/register',
registerValidate,
userExist,
referalCheck, 
UserController.register
);

route.post('/login',

loginValidate,
findUser,
checkPswd,

UserController.login

);
route.get('/logout',
verifyToken,
UserController.logout
);
route.patch(
    "/update",
    verifyToken,
     userFound,
     UserController.userUpdate
    )

export default route;