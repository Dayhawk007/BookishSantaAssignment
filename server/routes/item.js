import express from 'express'
import { FindItem } from '../controllers/Item.js'

const router=express.Router();

router.get("/searchItem/:q",FindItem);

export default router;