import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service.js';
import { CreateDailyResultDto } from './dto/create-daily-result.dto.js';

@Injectable()
export class DailyResultsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  // Save daily result
  async saveDailyResult(body: CreateDailyResultDto) {
    // Convert percentages to decimal
    const vatValue = body.vat_percentage / 100;
    const feesValue = body.fees_percentage / 100;
    const commissionsValue = body.commissions_percentage / 100;

    // Calculate revenue
    const revenue = body.revenue_per_order * body.orders;

    // Calculate costs
    const vat = revenue * (vatValue / (1 + vatValue));
    const fees = revenue * feesValue;
    const commissions = revenue * commissionsValue;
    const totalCogs = body.cogs * body.orders;
    const totalShipping = body.shipping * body.orders;

    // Calculate profits
    const grossProfit =
      revenue - (totalCogs + vat + fees + commissions + totalShipping);

    const netProfit = grossProfit - body.ad_spend;

    // Calculate margin and ROAS
    const profitMargin = revenue === 0 ? 0 : (netProfit / revenue) * 100;
    const roas = body.ad_spend === 0 ? null : revenue / body.ad_spend;

    // Prepare the database record
    const dailyResult = {
      ...body,
      revenue,
      gross_profit: grossProfit,
      net_profit: netProfit,
      profit_margin: profitMargin,
      roas,
      updated_at: new Date().toISOString(),
    };

    // Save the record for this date
    const { data, error } = await this.supabaseService.client
      .from('daily_results')
      .upsert(dailyResult, { onConflict: 'date' })
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException('Failed to save daily result');
    }

    return data;
  }

  // Get daily result
  async getDailyResult(date: string) {
    const { data, error } = await this.supabaseService.client.from('daily_results').select('*').eq('date', date).maybeSingle();

    if (error) {
        throw new InternalServerErrorException('Failed to fetch daily result');
    }

    if (!data) {
        throw new NotFoundException('No daily result found for this date');
    }

    return data;
  }

  // Get calendar
  async getCalendarResults() {
    const { data, error } = await this.supabaseService.client.from('daily_results').select('date, net_profit, profit_margin').order('date', { ascending: true });

    if (error) {
        throw new InternalServerErrorException('Failed to fetch calendar results');
    }

    return data;
  }

}