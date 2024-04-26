import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HealthCheckModule } from '../src/modules/health-check/health-check.module';

describe('Healthcheck Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthCheckModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Health Check', () => {
    return request(app.getHttpServer()).get('/health-check').expect(200);
  });
});
