import { Router } from "express";
import PaymentContoller from "../../controllers/PaymentController";
import depositValidate from "../../validation/estimateValid";
import verifyToken from "../../middlewares/verifyToken";

const route = Router();

route.get(
    '/',
    verifyToken,
    PaymentContoller.getCurrency

);
route.post(
    '/',
    verifyToken,
    PaymentContoller.pay
    );
route.post(
    '/estimate',
    depositValidate,
    verifyToken,
    PaymentContoller.estimateDeposit
);
route.post(
    '/callback',
    PaymentContoller.pCallback
)

export default route;