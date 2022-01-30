import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('healthz')
export class HealthzController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly typeOrmHealthIndicator: TypeOrmHealthIndicator,
  ) {}

  @Get()
  getHealthz() {
    return this.healthCheckService.check([
      () =>
        this.typeOrmHealthIndicator.pingCheck('bookshelf', { timeout: 300 }),
    ]);
  }
}
