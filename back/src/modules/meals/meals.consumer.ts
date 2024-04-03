import { connect, Channel, Connection, ConsumeMessage } from 'amqplib';
import { MealsService } from './meals.service';
import OpenAI from 'openai';

interface EstimatedMealStats {
  fatGrams: number;
  carbGrams: number;
  proteinGrams: number;
  calories: number;
}

export class AnalyzedMealConsumer {
  private readonly MEAL_QUEUE_NAME = 'meal-queue';
  private connection: Connection;
  private channel: Channel;
  private openai: OpenAI;

  constructor(private readonly mealsService: MealsService) {}

  async init() {
    try {
      const { MQ_CONNNEXTION_STRING } = process.env;
      this.connection = await connect(MQ_CONNNEXTION_STRING);
      this.channel = await this.connection.createChannel();
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      this.startConsuming();
    } catch (error) {
      console.error('Failed to connect to RabbitMQ', error);
    }
  }

  async startConsuming() {
    await this.channel.assertQueue(this.MEAL_QUEUE_NAME, { durable: true });
    this.channel.consume(this.MEAL_QUEUE_NAME, this.consume);
  }

  async getMealStats(description: string): Promise<EstimatedMealStats> {
    const prompt = `Answer only with a JSON that matches \
    {proteinGrams:integer,fatGrams:integer,carbGrams:integer,calories:integer}\
    Estimate the macronutrients and calories of the following meal "${description}\
    If not a meal, answer with JSON {error:true}`;

    const { choices } = await this.openai.chat.completions.create({
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-3.5-turbo',
    });
    console.log(choices[0].message.content);
    return JSON.parse(choices[0].message.content);
  }

  consume = async (message: ConsumeMessage) => {
    try {
      const { id, description } = JSON.parse(message.content.toString());
      const mealStats = await this.getMealStats(description);
      await this.mealsService.update(id, {
        fats: mealStats?.fatGrams,
        carbs: mealStats?.carbGrams,
        proteins: mealStats?.proteinGrams,
        calories: mealStats?.calories,
      });
    } catch (err) {
      console.log(err);
    } finally {
      this.channel.ack(message);
    }
  };
}

export async function analyzedMealConsumerFactory(mealsService: MealsService) {
  const consumer = new AnalyzedMealConsumer(mealsService);
  await consumer.init();
  return consumer;
}
