import express from "express";
import { authController,checkOtpController,refreshAccessToken,getUserData,signupController} from "../Controllers/authController.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { authCheck } from "../Middleware/authCheck.middleware.js";
import { generateAccessToken } from "../Utils/tokens.js";
import { authorizedRoles } from "../Middleware/authorizedRoles.js";





const authRoute = express.Router()
authRoute.post(
  "/signup",
  asyncHandler(signupController)
);
authRoute.post("/login",asyncHandler(authController))
authRoute.post("/otp-verify",asyncHandler(checkOtpController))
authRoute.post("/refresh",asyncHandler(refreshAccessToken))
authRoute.get("/user/:userId",asyncHandler(getUserData))


authRoute.get(
  "/test-route",
  authCheck,authorizedRoles("admin"),
  async (req, res) => {
    res.send("You are authenticated");
  }
); 
export default authRoute