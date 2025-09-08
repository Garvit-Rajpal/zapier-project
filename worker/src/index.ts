import { Kafka } from "kafkajs";
const TOPIC_NAME = "zap-events";
const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});

async function main() {
  while (1) {
    const consumer = kafka.consumer({
      groupId: "outbox-worker-group",
    });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });
    const consume = await consumer.run({
      autoCommit: false,
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        });
        await new Promise(r=>setTimeout(r,5000));
        console.log("processing done");
        await consumer.commitOffsets([
          {
            topic: TOPIC_NAME,
            partition: partition,
            offset: (Number(message.offset) + 1).toString(),
          },
        ]);
      },
    });

    console.log(consume);
  }
}
main();
