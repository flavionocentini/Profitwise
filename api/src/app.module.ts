import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { SettingsModule } from './settings/settings.module.js';
import { SupabaseModule } from './supabase/supabase.module.js';
import { DailyResultsModule } from './daily-results/daily-results.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SettingsModule,
    SupabaseModule,
    DailyResultsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
