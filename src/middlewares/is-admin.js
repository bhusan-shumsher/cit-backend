const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{

    const authHeader = req.get('Authorization');
    if(!authHeader){
        return res.status(500).send({message:'Not Authenticated'});
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodeToken;
    try{
        decodeToken = jwt.verify(token,'secret');
    }catch(err){
        return res.status(500).send({message:'unable to verify token'});
    }
    if(decodeToken.role !== 'admin'){
        return res.status(500).send({message:'Not Authorized'});
    }
    req.userId = decodeToken.id;
    req.role = decodeToken.role;
    req.email = decodeToken.email;
   next();
}