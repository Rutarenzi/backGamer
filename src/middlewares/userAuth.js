import passport from "passport";

export async function isUserAuth(req,res,next){
    try{
      passport.authenticate("local",(req,res,next)=>{
        if(err){ return next(err)}
        if(!user){
            return res.status(401).json(info)
        }
        req.user = user
        next()
      })(req,res,next)
    }catch(error){
            return res.status(500).json({message: "server Error"})
    }
}