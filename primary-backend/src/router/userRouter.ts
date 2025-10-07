import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { SignUpSchema,LoginSchema } from "../types";
import { prisma } from "../db"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const router =Router();


router.post("/register",async(req,res)=>{
    // Registration/signup logic here
    const body = req.body;
    const parsedBody = SignUpSchema.safeParse(body);
    if(!parsedBody.success){
        return res.status(400).json({
            message: "Invalid request",
            errors: parsedBody.error
        })
    }
    const userExists=await prisma.user.findFirst({
        where:{
            email: parsedBody.data.email
        }
    });
    if(userExists){
        return res.status(401).json({
            message: "user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(parsedBody.data.password,10);
    const user = await prisma.user.create({
        data:{
            name: parsedBody.data.name,
            email:parsedBody.data.email,
            password:hashedPassword
        }
    });
    if(!user){
        return res.status(500).json({
            message: "Internal server error: Try again later"
        })
    }
    return res.status(201).json({
        message: "Please verify your email to complete the registration"
    })



})

router.post("/login",async(req,res)=>{
    // Login logic here
    const body = req.body;
    const parsedBody = LoginSchema.safeParse(
        body
    );
    if(!parsedBody.success){
        return res.status(400).json({
            message: "Invalid request",
            errors: parsedBody.error
        })
    }

    const user = await prisma.user.findFirst({
        where:{
            email:parsedBody.data.email
        }
    })
    if(!user){
        return res.status(401).json({
            message: "Invalid email"
        })
    }
    const passwordMatch = await bcrypt.compare(parsedBody.data.password,user.password);
    if(!passwordMatch){
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    // Generate a jwt token
    const jwtToken = jwt.sign({
        id:user.id,
        email:user.email,
        name:user.name
    },JWT_SECRET,{
        expiresIn: "1h"
    });

    return res.status(200).json({
        message: "Login successful",
        token: jwtToken
    });
});

export const userRouter =router;