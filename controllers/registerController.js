const joi  = require('joi');
const users = require('../models')
const bcrypt  = require('bcrypt');
const jwt  = require('../service/JwtService')
const bodyParser = require('body-parser');
const CustomErrorHandler = require('../service/CustomErrorHandler');
const  registerController = {
 async register(req,res,next){

    //validate the request
    //autherise the request
    //check if user is int eh database already
    //prepare model 
    // store in database 
    //generate jwt token 
    //send response


    //validation
    const registerSchema  = joi.object(
      {
        name:joi.string().min(3).max(12).required(),
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
        repeat_password:joi.ref('password')
      }
    );
    // console.log(req.body);
    const {error}  =registerSchema.validate(req.body);
     if(error){
       return next(error);
       
     }
    //check if user is in database already
     try{
       const exist = await users.exists({email:req.body.email});
        if(exist){
          return next(CustomErrorHandler.alreadyExist("This email is already taken."));
        }
     }
     catch(err){
         return next(err);
     }
     
    //  #password
    //bcrypt
    const {name,email,password} = req.body;
    const hashedPassword  = await bcrypt.hash(password,10);

    //prepare the model 
    
    const user = new users({
      name,
      email,
      password:hashedPassword,
    });
    let access_token;
    try{
     const result = await user.save();
    //  console.log(result);
      //token
       access_token = jwt.sign({_id:result._id,role:result.role})
      
    }catch(err){
      return next(err);
    }

     res.send({access_token:access_token});
  }
}


module.exports  = registerController;