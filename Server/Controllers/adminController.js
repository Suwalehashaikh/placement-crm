import { Employee } from "../Models/employeeSchema.js";
import { customError } from "../Utils/customError.js";
import bcrypt from "bcrypt"
import { success } from "../Utils/success.js";


//create user with roles api
export const createUserController = async(req,res)=>{
const {name,email,phone,role,password}=req.body
    if(!name || !email || !phone || !role || !password){
        throw new customError(400,"All fields are required")
       
    }
    const user = await Employee.findOne({email})
    if(user){
         throw new customError(400,"User already exists")
    }
    //password encryption
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = await Employee.create({name,email,phone,role,password:hashedPassword})
    success(res,201,"User created successfully")
  
    }