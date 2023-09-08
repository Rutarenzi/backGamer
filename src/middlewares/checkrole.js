const checkRole = (role) => (req,res, next) =>{
   try{

     if(role.includes(req.user.role)){
        next();
     } else {

        return res.status(401).json({
            status: 401,
            message: `only accessible for ${role.join()}`
        });
     }
   }catch(error) {
     return res.status(500).json({ status: 500, message: "Server error"});
   }
}

export default checkRole;