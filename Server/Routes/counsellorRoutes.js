import express from "express";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { authCheck } from "../Middleware/authCheck.middleware.js";
import { authorizedRoles } from "../Middleware/authorizedRoles.js";
import { createStudent } from "../Controllers/counsellorController.js";

const CounsellorRoute = express.Router();

CounsellorRoute.post(
  "/students",
  authCheck,
  authorizedRoles("admin", "counseller"),
  asyncHandler(createStudent)
);

export default CounsellorRoute;