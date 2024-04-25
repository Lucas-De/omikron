import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/is-public.decorator';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  @Get()
  @Public()
  healthCheck() {
    return 'App is Running';
  }
}
