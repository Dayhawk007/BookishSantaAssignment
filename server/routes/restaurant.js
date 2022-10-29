import express from 'express';
import { AddItem, UpdateItem } from '../controllers/Item.js';
import { createRestaurant } from '../controllers/Restaurant.js';

const router=express.Router()

router.post("/createRestaurant",createRestaurant);
router.post("/:id/AddItem",AddItem);
router.post("/:rest_id/UpdateItem/:item_id",UpdateItem);

export default router