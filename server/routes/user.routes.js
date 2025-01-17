import express from "express";
import  {authenticateToken}  from "../middlewares/authMiddleware.js";
import { authorized, getProfile, login, signup } from "../controllers/user.controllers.js";

const router = express.Router();


router.post("/signup", signup); 
router.post("/login", login);   
router.get("/profile", authenticateToken, getProfile); 
router.get('/dashboard',authenticateToken, authorized);

export default router;