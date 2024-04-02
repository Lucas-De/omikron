import { connect, Channel, Connection, ConsumeMessage } from 'amqplib';
import { MealsService } from './meals.service';

export class AnalyzedMealConsumer {
  private readonly MEAL_QUEUE_NAME = 'meal-queue';
  private connection: Connection;
  private channel: Channel;

  constructor(private readonly mealsService: MealsService) {}

  async init() {
    try {
      this.connection = await connect({
        hostname: 'localhost',
        port: 5672,
        username: 'user',
        password: 'password',
      });
      this.channel = await this.connection.createChannel();
      this.startConsuming();
    } catch (error) {
      console.error('Failed to connect to RabbitMQ', error);
    }
  }

  async startConsuming() {
    await this.channel.assertQueue(this.MEAL_QUEUE_NAME, { durable: true });
    this.channel.consume(this.MEAL_QUEUE_NAME, this.consume);
  }

  consume = async (message: ConsumeMessage) => {
    const { id, ...nutritionalInfo } = JSON.parse(message.content.toString());
    await this.mealsService.update(id, {
      ...nutritionalInfo,
      proteins: 200,
      calories: 1450,
    });
    this.channel.ack(message);
  };
}

export async function analyzedMealConsumerFactory(mealsService: MealsService) {
  const consumer = new AnalyzedMealConsumer(mealsService);
  await consumer.init();
  return consumer;
}
