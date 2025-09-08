import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";
const prisma=new PrismaClient();
const TOPIC_NAME="zap-events";
const kafka=new Kafka({
    clientId: "outbox-processor",
    brokers: ["localhost:9092"]
})
async function main(){
    const producer=kafka.producer();
    await producer.connect();
    while(1){
        const pendingRows=await prisma.zapRunOutBox.findMany({
            take:10
        });
        
        producer.send({
            topic:TOPIC_NAME,
            messages:pendingRows.map(row=>({
                key:row.id,
                value:row.zapRunId
            }))
        });
        console.log(`Processed ${pendingRows.length} rows`);
        await prisma.zapRunOutBox.deleteMany({
            where:{
                id:{
                    in: pendingRows.map(r=>r.id)
                }
            }
        })
    }
}
main();