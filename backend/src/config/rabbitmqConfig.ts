
import dotenv from "dotenv"

const result = dotenv.config();

const config= {
    rabbit: {
    connectionString: result.parsed.RABBITMQ_CONNECTION_STRING || "amqp://rabbitmq:5672",
    queue: result.parsed.QUEUE
    }
}
export default config;