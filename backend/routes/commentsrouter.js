import express from "express"
import { handleResponse } from "../utils/index.js"
import { createComment, getAllComments } from "../controllers/index.js"
const router=express.Router()
router.post("/comments",handleResponse.bind(this,createComment))
router.get("/comments",handleResponse.bind(this,getAllComments))

export default router