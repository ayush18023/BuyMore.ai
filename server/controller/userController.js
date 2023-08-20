import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {promisify} from 'util'
import user from "../model/user-schema.js"
const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES})
}
export const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({
            status:'failure',
            message:"login to continue"
        })
    }
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    let User=await user.findOne({_id:decoded.id});
    if(!User){
        return res.status(401).json({
            status:'failure',
            message:"login to continue"
        });
    }
    req.user=User;
    next();
}
export const userSignup = async (req, res) => {
    try {
        const exist1 = await user.findOne({ userName: req.body.userName })
        const exist2 = await user.findOne({ email: req.body.email })
        // console.log(req.body.userName)
        if (exist1) {
            return res.status(401).json({ message: 'username already exists' })
        }
        if (exist2) {
            return res.status(401).json({ message: 'email already exists' })
        }
        const password=await bcrypt.hash(req.body.password,12);
        const User=await user.create({firstName:req.body.firstName,lastName:req.body.lastName,userName:req.body.userName,email:req.body.email,password,phone:req.body.phone});
        // console.log(User);
        const token=signToken(User.id);
        const cookieOptions={
            expires:new Date(Date.now()+90*24*60*60*1000),
            httpOnly:  false,
            // secure:true
        }
        res.cookie('jwt',token,cookieOptions);
        return res.status(200).json({ 
            status:'success',
            data:{
                User,
                token
            }
        })
    }
    catch (err) {
        return res.status(500).json({ message:err.message })
    }
}
export const userLogin = async (req, res) => {
    try {
        const userName = req.body.logine
        const password = req.body.loginp
        let User = await user.findOne({ userName: userName});
        if (User) {
            if(await bcrypt.compare(password,User.password)){
                const token=signToken(User.id);
                const cookieOptions={
                    expires:new Date(Date.now()+90*24*60*60*1000),
                    httpOnly:false,
                    // secure:true
                }
                res.cookie('jwt',token,cookieOptions);
                res.status(200).json({
                    status:'success',
                    data:{
                        token,
                        User
                    }
                });
            }
            else{
                res.status(401).json({
                    message:"Invalid token"
                })
            }
        }
        else {
            return res.status(401).json('Invalid login')
        }
    }
    catch (err) {
        return res.status(500).json(err.message)
    }
}
export const userCheck=async(req,res,next)=>{
    // console.log(req.cookies.jwt);
    const token=req.cookies.jwt
    if(!token){
        return res.status(401).json({
            status:'failure',
        });
    }
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    let User=await user.findOne({_id:decoded.id});
    console.log(User.firstName);
    if(!User){
        res.status(401).json({
            status:'failure',
        });
    }
    else{
        res.status(200).json({
            status:'success',
            User
        })
    }
    next();
}