import { Router } from "express";
import verifyToken from "../../middlewares/verifyToken";

const route = Router();

route.get('/', verifyToken,(req,res) => {
    res.status(200).json({message:"Welcome  website"});
});

export default route;