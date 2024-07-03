const { Router } = require("express")
const userModel = require("../models/userSchema")
const bcrypt = require("bcrypt");
const  jwt  = require("jsonwebtoken");
const userRoutes = Router()

userRoutes.post("/register",async (req,res)=>{
	try{
        var userData = req.body;
        bcrypt.hash(userData.password, 8, async (err, hash)=>{
            const user = new userModel({...userData,password:hash});
            await user.save();
        })
	}catch(err){
		console.log(err)
	}
	res.send("Registered")
})
userRoutes.post("/login",async (req,res)=>{
	const {email,password}=req.body
	try{
		const user=await userModel.find({email})
		if(user.length>0){
			bcrypt.compare(password, user[0].password, (err, result)=>{
				if(result){
					const token = jwt.sign({email:user.email},"aditya",(err, token)=>{
						if(err) console.log(err);
						else{
							res.status(200).json({accessToken:token});
						}
					}, {expireIn:"1m"})
				}
				else{res.send("Wrong Password")}
			})
		} else {
			res.send("Login Failed")
		}
	} catch(err){
		console.log(err)
	}
})



module.exports = userRoutes;
