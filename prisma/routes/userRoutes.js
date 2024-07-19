import express from 'express'
import { CreateUser, UpdateUser } from '../controllers/user.js';

const router = express.Router();

router.post("/", CreateUser)

router.put("/:id", UpdateUser)

export default router;
