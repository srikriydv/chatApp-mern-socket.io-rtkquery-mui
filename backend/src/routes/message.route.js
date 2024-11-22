import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import { getUsersForSidebar, getMessagesForChat, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessagesForChat);
router.post("/send/:id", protectRoute, sendMessage);


export default router;