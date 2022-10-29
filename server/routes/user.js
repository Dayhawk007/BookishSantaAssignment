import express from 'express';
import { createOrder } from '../controllers/Order.js';
import { registerUser,loginUser, giveRating } from '../controllers/User.js';
const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/:user_id/:rest_id/createOrder",createOrder)
router.post("/:user_id/:rest_id/giveRating",giveRating);


export default router