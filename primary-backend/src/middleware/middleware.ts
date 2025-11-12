import { NextFunction,Response,Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";

export function authMiddleware(req:Request, res: Response, next:NextFunction){
    const token = req.headers.authorizaiton as unknown as string;
    if(!token){
        return res.status(403).json({
            message: "Forbidden: No token provided"
        })
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        // @ts-ignore
        req.id=payload.id;
        next();
    }
    catch(error){
        return res.status(401).json({
            message: "Unauthorized: Invalid token"
        })
    }
}

