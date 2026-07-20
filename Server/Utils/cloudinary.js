import { v2 as cloudinary } from "cloudinary";
import {CloudinaryStorage} from "multer-storage-cloudinary"
import multer from "multer";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder:"crm-uploads",

    format : async(req,file)=>{
      //auto detect format (jpeg,png,webp etc)
      return file.mimetype.split("/")[1]
    },
    public_id:(req,file)=>{
      const uniqueName =Date.now()+"_"+file.originalname;
      return uniqueName
    }
  }
})
export const upload = multer({storage})
