import express from "express";
import dotenv from "dotenv";
import dbConnect from "./Database/dbConnect.js";
import adminRoute from "./Routes/adminRoutes.js"
import hrRoute from "./Routes/hrRoutes.js"
import counsellorRoute from "./Routes/counsellorRoutes.js"
import authRoute from "./Routes/authRoutes.js"
import dataRoute from "./Routes/dataRoutes.js"
import profileRoute from "./Routes/profileRoutes.js"
import cors from "cors"
import { errorHandler } from "./Utils/globalError.js";
import cookieParser from "cookie-parser";
import requestLogger from "./Middleware/requestLogger.js";
import { limiter } from "./config/rateLimiter.js";

import winston from "winston";





//env config
dotenv.config()

const app= express()

const PORT = process.env.PORT|| 5000

//database connection
dbConnect()

//cookie parser
app.use(cookieParser())

//cors config
app.use(
  cors({
    origin: [
      "https://placement-crm-peach.vercel.app/login",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//json body parser
app.use(express.json());

//winston log middleware
app.use(requestLogger)

///rate limiter for apis
app.use(limiter)

//All api routes
app.use("/api/admin", adminRoute)
app.use("/api/auth", authRoute)
app.use("/api/counsellor", counsellorRoute)
app.use("/api/hr", hrRoute)
app.use("/api/data", dataRoute)
app.use("/api/profile", profileRoute)







///async middleware global handler
app.use(errorHandler)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})