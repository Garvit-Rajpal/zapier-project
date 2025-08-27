import express from 'express';
const app=express();
// hooks url something like /hooks/catch/userId/hookId
app.post('/hooks/catch/:userId/:hookId',(req,res)=>{
    const {userId,hookId} = req.params;
})