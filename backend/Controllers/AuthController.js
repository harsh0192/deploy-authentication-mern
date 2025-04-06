// here we will write the logic for signup 
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../Models/User');

const signup = async (req, res)=>{
   try{
    const { name,email,password}= req.body;
    const user= await UserModel.findOne({email})
    if(user){
      return res.status(409).json({messege: 'User is already exist,you can log in ', success : false})
    }
   //  if email not found 
    const userModel= new UserModel({name,email,password});
   //  before using the save method we ahve to encypt the password 
   userModel.password= await bcrypt.hash(password,10);
   await userModel.save();
   res.status(201).json({message : 'Signup successfully',success : true})


   }catch(e){
      res.status(500).json({ message: 'Internal Server Error', success: false });
   }
}

// login functionality
const login = async (req, res)=>{
   try{
    const { email,password}= req.body;
    const user= await UserModel.findOne({email})
    const errorMsg= 'Auth failed email or password is wrong'
    if(!user){
      return res.status(403).json({messege: errorMsg, success : false})
    }
   //  decrypting the password 
   const isPassEqual =  await bcrypt.compare(password, user.password);
   if(!isPassEqual){
      return res.status(403).json({messege: errorMsg, success : false})
   }
   const jwtToken= jwt.sign(
      {email: user.email, _id : user._id, },
      process.env.JWT_SECRET,
      {expiresIn: '24h'}
   

   )
   res.status(200).json({message : 'Login succesfully successfully',success : true, jwtToken,email,name : user.name})


   }catch(e){
      res.status(500).json({ message: 'Internal Server Error', success: false });
   }
}

module.exports= {
   signup,
   login
   
}