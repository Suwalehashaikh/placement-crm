import express from "express";
import { createUserController } from "../Controllers/adminController.js"; 
import { asyncHandler } from "../Utils/asyncHandler.js";
const adminRoute = express.Router()
adminRoute.post("/create-user",asyncHandler(createUserController))
 export default adminRoute;