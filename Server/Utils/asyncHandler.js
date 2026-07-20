export const asyncHandler = (fn) =>async (req,res,next)=>{
try{
    await fn(req,res,next);
}catch(error){
//Centralized error handling logic
console.error("Async handler caught an error:",error)
//pass the error to the Express error handling middleware
next(error)
}
}