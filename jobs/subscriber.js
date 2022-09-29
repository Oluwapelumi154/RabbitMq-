const amqp = require('amqplib');
const sendEmail = require('../utils/mail');

const consumeFromQueue = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue('spot', { durable: true });
    channel.prefetch(1);
    channel.consume('spot', (data) => {
      const message = JSON.parse(data.content.toString());
      sendEmail(message)
        .then(() => {
          console.log(`Delivered Queued message to ${message.email}`);
          channel.ack(data);
        })
        .catch((err) => {
          console.log(err);
          return channel.nack(data);
        });
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
consumeFromQueue();
