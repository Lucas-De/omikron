import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../authentication/authentication.guard';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  @Public()
  healthCheck() {
    return 'App is Running';
  }
}
