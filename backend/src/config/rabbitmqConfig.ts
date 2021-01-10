
import dotenv from "dotenv"

dotenv.config();


const config= {
    rabbit: {
    connectionString: process.env.RABBITMQ_CONNECTION_STRING || "amqp://rabbitmq:5672",
    queue: process.env.QUEUE
    }
}
export default config;