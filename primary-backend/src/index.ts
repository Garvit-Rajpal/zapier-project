import express from 'express';
import { userRouter } from './router/userRouter'
const app=express();
app.use(express.json());

app.use("api/v1/user",userRouter);
app.use("api/v1/zap",zapRouter);
app.listen(3000,()=>{
    console.log("Server started on port 3000");
});