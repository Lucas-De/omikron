import { connect, Channel, Connection, ConsumeMessage } from 'amqplib';
import { MealsService } from './meals.service';
import OpenAI from 'openai';
import { MealStatus } from './entities/meal.entity';

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
    WARNING: IF THE DESCRIPTION ABOVE IS NOT A MEAL, ANSWER WITH JSON {error:true}.`;

    const { choices } = await this.openai.chat.completions.create({
      response_format: { type: 'json_object' },
      messages: [{ role: 'system', content: prompt }],
      model: 'gpt-4-turbo-preview',
    });

    const response = JSON.parse(choices[0].message.content);
    if (response.error) throw new Error('Description is not a meal');
    return response;
  }

  consume = async (message: ConsumeMessage) => {
    const { id, description } = JSON.parse(message.content.toString());

    try {
      const mealStats = await this.getMealStats(description);

      await this.mealsService.update(id, {
        fats: mealStats?.fatGrams,
        carbs: mealStats?.carbGrams,
        proteins: mealStats?.proteinGrams,
        calories: mealStats?.calories,
        status: MealStatus.Processed,
      });
    } catch (err) {
      console.log(err);
      await this.mealsService.update(id, { status: MealStatus.Error });
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
