import express from "express";
import { login, logout, signup, users } from "../controller/auth.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , logout);
router.get("/users" , authenticateToken , users);


export default router;