import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';

describe('Health Check Controller', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
    }).compile();

    healthCheckController = app.get(HealthCheckController);
  });

  it('healthCheck', () => {
    expect(healthCheckController.healthCheck()).toEqual('App is Running');
  });
});
