import { connect, Channel, Connection } from 'amqplib';
import { Meal } from './entities/meal.entity';

interface MealWithImage extends Meal {
  image?: string;
}

export class MealProducer {
  private readonly MEAL_QUEUE_NAME = 'meal-queue';
  private connection: Connection;
  private channel: Channel;

  async init() {
    try {
      const { MQ_CONNNEXTION_STRING } = process.env;
      this.connection = await connect(MQ_CONNNEXTION_STRING);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Failed to connect to RabbitMQ', error);
    }
  }

  async sendMeal(meal: MealWithImage) {
    await this.channel.assertQueue(this.MEAL_QUEUE_NAME, { durable: true });
    const message = Buffer.from(JSON.stringify(meal));
    this.channel.sendToQueue(this.MEAL_QUEUE_NAME, message, {
      persistent: true,
    });
  }
}

export async function mealProducerFactory() {
  const producer = new MealProducer();
  await producer.init();
  return producer;
}
