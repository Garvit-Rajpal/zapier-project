import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

async function main(){
    while(1){
        await prisma.zapRunOutBox.findMany({
            take:10
        });
    }
}
main();