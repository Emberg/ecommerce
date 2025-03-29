import express from "express";
import { directToCheckout } from "../controllers/checkoutController";
const router = express.Router();

router.post("/", directToCheckout)

export default router