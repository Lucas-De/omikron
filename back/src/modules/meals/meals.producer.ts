import { connect, Channel, Connection } from 'amqplib';
import { Meal } from './entities/meal.entity';
import { brokerConfig } from 'src/broker/broker.config';

export class MealProducer {
  private readonly MEAL_QUEUE_NAME = 'meal-queue';
  private connection: Connection;
  private channel: Channel;

  async init() {
    try {
      this.connection = await connect(brokerConfig);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      console.error('Failed to connect to RabbitMQ', error);
    }
  }

  async sendMeal(meal: Meal) {
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
