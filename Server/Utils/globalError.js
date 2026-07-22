/* export const errorHandler = (err,req,res,next)=>{
    if(res.headersSent){
       err.statusCode = err.statusCode || 500
       err.message = err.message || "Internal Server Error"
    }
    res.status(err.statusCode).json({status:"Fail",message:err.message})
} */


   export const errorHandler = (err, req, res, next) => {
  console.error("FULL ERROR:", err);
  console.error("STACK:", err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).json({
    status: "Fail",
    message: err.message || "Internal Server Error",
  });
};