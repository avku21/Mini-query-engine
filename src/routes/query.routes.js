import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { explainQuery, processQuery, validateQuery } from "../controller/query.controller.js";

const router = express.Router();

router.post("/query" , authenticateToken , processQuery );
router.post("/explain" , authenticateToken , explainQuery );
router.post("/validate" , authenticateToken , validateQuery );

export default router;