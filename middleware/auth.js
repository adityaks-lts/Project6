const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret_key = process.env.SECRET_KEY ;
const auth=(req,res,next)=>{
    console.log(req.headers.authorization);
    const header = req.headers.authorization; 
    if(header){
        const token = header.split(" ")[1];
        // res.send(token)
        jwt.verify(token, secret_key, (err, decode)=>{
            if(err) res.sendStatus(400);
            else{
                req.user = decode;
                next();
            }
        })

    }
    else res.send(400).json({message:"token header is not present"})
}

module.exports = auth;