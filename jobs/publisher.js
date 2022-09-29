const amqp = require('amqplib');
const consumeMessageFromQueue = require('./subscriber');
const publishToQueue = async (queueName, content) => {
  try {
    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    console.log('RabbitMq Server Running');
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)), {
      persistent: true,
      contentType: 'application/json'
    });
    console.log('Message Sent to Queue');
    return channel.close(() => {
      connection.close();
      console.log('Closing RabbitMq Server');
    });
  } catch (err) {
    console.log(err);
    return;
  }
};

module.exports = publishToQueue;
