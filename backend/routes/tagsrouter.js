import express from "express";
import { handleResponse } from "../utils/index.js";
import { getSampleTags } from "../controllers/index.js";
const router = express.Router();
router.get("/tags", handleResponse.bind(this, getSampleTags));
export default router;
