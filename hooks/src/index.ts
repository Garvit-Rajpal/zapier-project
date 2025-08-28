import express from 'express';
const app=express();
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
app.use(express.json());
app.listen(3000,()=>{
    console.log("Server started on port 3000");
});
// hooks url something like /hooks/catch/userId/hookId
app.post('/hooks/catch/:userId/:zapId',async(req,res)=>{
    const {userId,zapId} = req.params;
    const body = req.body;
    console.log(body);
    // store in db a new trigger
    await prisma.$transaction(async tx => {
        const run = await tx.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });;

        await tx.zapRunOutBox.create({
            data: {
                zapRunId: run.id
            }
        })
    })
    res.json({
        message: "Webhook received"
    })
})