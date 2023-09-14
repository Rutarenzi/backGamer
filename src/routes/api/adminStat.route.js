import { Router } from  "express";
import verifyToken from "../../middlewares/verifyToken";
import isAdmin from "../../middlewares/checkAdmin";
import AdminStatController from "../../controllers/AdminStatController";
import userAvail from "../../middlewares/userAvail";
import levelExist from "../../middlewares/levelExist";
import UserController from "../../controllers/UserController";
import bonusValidate from "../../validation/bonusValid";
import userUpdateValidate from "../../validation/userUpdateValid";
const route = Router();

route.get(
    "/",
    verifyToken,
    isAdmin,
    AdminStatController.getAllStat
);
route.get(
    "/newUser",
    verifyToken,
    isAdmin,
    AdminStatController.newUser
);
route.get(
    "/user/:id",
    verifyToken,
    isAdmin,
    userAvail,
    AdminStatController.getUser
);
route.get("/allUsers",
   verifyToken,
   isAdmin,
   AdminStatController.getAllUser
)
route.patch(
    "/user/:id",
    userUpdateValidate,
    verifyToken,
    isAdmin,
    userAvail,
    UserController.adminUpdateUser
    
);
route.delete(
    "/user/:id",
    verifyToken,
    isAdmin,
    userAvail,
    UserController.adminDeleteUser
)
route.patch(
    "/user/bonus/:id",
    bonusValidate,
    verifyToken,
    isAdmin,
    userAvail,
    AdminStatController.addBonus
);
route.patch( 
    "/user/level/:id",
    verifyToken,
    isAdmin,
    userAvail,
    levelExist,
    AdminStatController.changeLevel
);
route.get(
    "/whoCash",
    verifyToken,
    isAdmin,
    AdminStatController.getWhoCash
);
route.get(
    "/whoCash/accept/:id",
    verifyToken,
    isAdmin,
    userAvail,
    AdminStatController.acceptWhoCash
);
route.get(
    "/whoCash/reject/:id",
    verifyToken,
    isAdmin,
    userAvail,
    AdminStatController.rejectWhoCash
)
export default route


