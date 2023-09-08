import Jwtutils from "../utils/JwtUtils";
const { User } = require("../database/models");
import  redisClient from "../utils/redis";

const verifyToken = async (req,res,next) =>{
  try{
    
//const token = req.cookies.jSec || " ";
if(!req.header("Authorization")){
  return res.status(401).json({ status: 401, message: "Please login"})
}
const token = req.header("Authorization").split(" ")[1]
 // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyLCJ1c2VybmFtZSI6ImphY3ExMiIsImZ1bGxuYW1lIjoibWFuaXJhZ3VoYSBKYWNxdWVzIiwicGhvbmUiOiIrMjUwNzg4MjQxNTAxIiwid2hhdHNhcHAiOiIrMjUwNzg4MjQxNTAxMSIsInJlZmVyYWxfY29kZSI6ImdmZW81NDgiLCJyZWZlcnJlciI6ImZncjEyMyIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2ODg2NjQ5OTB9.D9e_aQnPnhO2UWXWm71FG-kg3irveW4jHat-PR9DhWw"
    if(!token){
      return res.status(401).json({ status: 401, message: "Please login"})
    }

    const details = Jwtutils.verify(token);
    const { username } = details.data;
   
    const redisToken = await redisClient.get(username); 
    
    if(redisToken === token){
    const userFound = await User.findOne({
         where: { username: details.data.username}});
     if(!userFound){
        return res.status(401).json({
            status: 401, message: "User not Found",
        });
     }   
     req.user = details.data;
     req.token = token;
     next();
     } else{
      return res.status(401).json({
        status: 401, message: "please Sign in",
    });
     }
     
  }catch(error){
    return res.status(401).json({status : 401, error:`No valid credentials ${error}`})
  }
};

export default verifyToken;