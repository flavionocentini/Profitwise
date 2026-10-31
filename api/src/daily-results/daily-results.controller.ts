import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { DailyResultsService } from './daily-results.service.js';
import { CreateDailyResultDto } from './dto/create-daily-result.dto.js';

@Controller('daily-results')
export class DailyResultsController {
  constructor(private readonly dailyResultsService: DailyResultsService) {}

  @Post()
  saveDailyResult(@Body() body: CreateDailyResultDto) {
    return this.dailyResultsService.saveDailyResult(body);
  }

  @Get(':date')
    getDailyResult(@Param('date') date: string) {
    return this.dailyResultsService.getDailyResult(date);
  }

}
