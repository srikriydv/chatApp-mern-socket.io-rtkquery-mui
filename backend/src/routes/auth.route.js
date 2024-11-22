import express from "express";
import { registerUser, loginUser, logoutUser, checkUser } from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check", protectRoute, checkUser);

export default router;