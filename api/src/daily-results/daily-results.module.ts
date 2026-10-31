import { Module } from '@nestjs/common';
import { DailyResultsController } from './daily-results.controller.js';
import { DailyResultsService } from './daily-results.service.js';
import { SupabaseModule } from '../supabase/supabase.module.js';

@Module({
  imports: [SupabaseModule],
  controllers: [DailyResultsController],
  providers: [DailyResultsService],
})
export class DailyResultsModule {}
