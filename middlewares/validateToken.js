const jwt=require('jsonwebtoken');

const validateToken=(req,res,next)=>{
    const authorization=req.headers.authorization || req.headers.Authorization;
    // console.log(authorization);
    const token=authorization.split(" ")[1];
    // console.log(token);
    const decoded=jwt.verify(token,process.env.SECRET_TOKEN);
    req.user=decoded;
    console.log(decoded);
    next();

}


module.exports=validateToken;