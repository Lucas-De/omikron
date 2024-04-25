import { IsPositive } from 'class-validator';

export class AnalyticsFilterQuery {
  @IsPositive()
  lookBackDays: number;
}
