const {ValidationError} = require('joi');
const CustomErrorHandler = require('../service/CustomErrorHandler');
const register = require('../controllers/registerController')
const errorHandler = (err,req,res,next)=>{
   let statusCode = 500;
   let data = {
       message:"internal server error",
       originalError: err.message
   }
   if(err instanceof ValidationError){
       statusCode = 422;
       let data = {
        message: err.message
    }
   }

   if(err instanceof CustomErrorHandler){
      statusCode =err.status;
      let data = {
       message: err.message
   }
  }


   return res.status(statusCode).json(data);
}


module.exports = errorHandler;