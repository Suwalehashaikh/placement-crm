import { Router } from "express";
import {
  getProfile,
  updateProfile,
} from "../Controllers/profileController.js";

import { authCheck } from "../Middleware/authCheck.middleware.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { upload } from "../Utils/cloudinary.js";

const profileRouter = Router();

profileRouter.get(
  "/",
  authCheck,
  asyncHandler(getProfile)
);

profileRouter.put(
  "/",
  authCheck,
  upload.single("profileImage"),
  asyncHandler(updateProfile)
);

export default profileRouter;