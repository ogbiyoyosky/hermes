#!/usr/bin/env node

import * as amqp from "amqplib"
import config from "../config/rabbitmqConfig"
const fetch = require("node-fetch")


const consumeFromQueue = async (queue, isNoAck = false, durable = false, prefetch = null) => {
    const cluster = await amqp.connect(config.rabbit.connectionString);
    const channel = await cluster.createChannel();
    await channel.assertQueue(queue, durable=false);
    if (prefetch) {
        channel.prefetch(prefetch);
    }
    console.log(` [x] Waiting for messages in ${queue}. To exit press CTRL+C`)

    try {
        channel.consume(queue, async message => {
      if (message !== null) {
        const data = JSON.parse(message.content.toString())
    
        //send data to subscribers 
        await fetch(data.server, {
        method: 'POST', 
        body: JSON.stringify({
          message: data.message,
          topic: data.topic
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(json => console.log("subscriber response>>>>>",json));
  
        channel.ack(message);
        return null;
      } else {
        console.log( 'Queue is empty!')
        channel.reject(message);
      }
    }, {noAck: isNoAck})
    } catch (error) {
        console.log(error, 'Failed to consume messages from Queue!')
        cluster.close(); 
    }
}
consumeFromQueue(config.rabbit.queue);