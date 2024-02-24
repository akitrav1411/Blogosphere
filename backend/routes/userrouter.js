import express from "express";
import { getUserData, login, signup } from "../controllers/index.js";
import { handleResponse } from "../utils/index.js";
const router = express.Router();

router.post("/signup", handleResponse.bind(this, signup));
router.post("/login", handleResponse.bind(this, login));
router.get("/user/:userId", handleResponse.bind(this, getUserData));
export default router;
