import amqp from "amqplib";

const queue = "user-message";

const message = {
    message_id: "just-put-random-uuid-here",
    content: "Hello World 123",
};

async function sendMessage() {
    let connection;
    try {
        connection = await amqp.connect("amqp://localhost");

        const channel = await connection.createChannel();

        await channel.assertQueue(queue, { durable: false });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));

        console.log(" [x] Sent %s", message);

        await channel.close();
    } catch (err) {
        console.warn(err);
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

sendMessage();
