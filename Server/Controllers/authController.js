import { otpTemplate } from "../Templates/otpTemplate.js";
import { sendEmail } from "../Services/emailService.js";
import { Employee } from "../Models/employeeSchema.js";
import { customError } from "../Utils/customError.js";
import { success } from "../Utils/success.js";
import { generateAccessToken,generateRefreshToken} from "../Utils/tokens.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"





// LOGIN CONTROLLER
export const authController = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new customError(
      400,
      "Email and password are required"
    );
  }

  // Check user
  const user = await Employee.findOne({ email });

  if (!user) {
    throw new customError(
      404,
      "User not found"
    );
  }

  // Verify password
  const isMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatched) {
    throw new customError(
      400,
      "Invalid credentials"
    );
  }

  // Generate OTP on EVERY login
  const otp = Math.floor(
    100000 + Math.random() * 900000
  );

  console.log("Generated OTP:", otp);

  // Save OTP
  user.otp = otp;

  // Optional: keep user verified forever
  user.isVerified = true;

  await user.save();

  // Email template
  const content = otpTemplate.replace(
    "{OTP}",
    otp
  );

  // Send email
  await sendEmail(
    email,
    "OTP Verification",
    content
  );

  return success(
    res,
    200,
    "OTP has been successfully sent. Check your email.",
    {
      email: user.email,
    }
  );
};
// VERIFY OTP CONTROLLER
export const checkOtpController = async (
  req,
  res
) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    throw new customError(
      400,
      "Email and OTP are required"
    );
  }

  const user = await Employee.findOne({
    email,
  });

  if (!user) {
    throw new customError(
      404,
      "User not found"
    );
  }

  if (user.otp !== Number(otp)) {
    throw new customError(
      400,
      "Invalid OTP"
    );
  }

  // Clear OTP
  user.otp = null;

  await user.save();

  // Create tokens
  const payload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken =
    generateAccessToken(payload);

  const refreshToken =
    generateRefreshToken(payload);

  // Save refresh token in cookie
  res.cookie(
    "refreshToken",
    refreshToken,
    {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
    }
  );

  return success(
    res,
    200,
    "OTP verified successfully",
    {
      accessToken,
      userId: user._id,
      role: user.role,
    }
  );
};

//Generate Access controller
export const refreshAccessToken = async(req,res)=>{
  //const{refreshToken}= req.cookies

  //console.log(refreshToken)
   console.log("req.cookies =>", req.cookies);

  const refreshToken = req.cookies?.refreshToken;

  console.log("refreshToken =>", refreshToken);
  if(!refreshToken){
    throw new customError(400,"Refresh token not found")
  }
  const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)
   if(!decoded){
    throw new customError(403,"Refresh token EXpired")
  }
  const payload = {
  userId: decoded.userId,
  role: decoded.role,
};
  const newAccessToken = generateAccessToken(payload)
  success(res,200,"new access token generated",newAccessToken)
}


//get user  data for user controller
// GET USER DATA
export const getUserData = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new customError(
      400,
      "No user Id found"
    );
  }

  const userDetails =
    await Employee.findById(userId)
      .populate("students");

  if (!userDetails) {
    throw new customError(
      400,
      "No user found"
    );
  }

  const data = {
    name: userDetails.name,
    email: userDetails.email,
    phone: userDetails.phone,
    role: userDetails.role, 
    students: userDetails.students, 
  };

  success(
    res,
    200,
    "User data fetched successfully",
    data
  );
};
export const signupController = async (
  req,
  res
) => {
  const {
    name,
    email,
    password,
    phone,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phone
  ) {
    throw new customError(
      400,
      "All fields are required"
    );
  }

  const existingUser =
    await Employee.findOne({
      email,
    });

  if (existingUser) {
    throw new customError(
      400,
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      password,
      10
    );

  const user =
    await Employee.create({
      name,
      email,
      password: hashedPassword,
      phone,

      // Default role
      role: "admin",
    });

  success(
    res,
    201,
    "Admin created successfully",
    user
  );
};