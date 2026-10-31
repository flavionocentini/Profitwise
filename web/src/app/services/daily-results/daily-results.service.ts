import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type DailyResult = {
  date: string;
  orders: number;
  ad_spend: number;
  revenue_per_order: number;
  cogs: number;
  fees_percentage: number;
  commissions_percentage: number;
  vat_percentage: number;
  shipping: number;
};

export type SavedDailyResult = DailyResult & {
  revenue: number;
  gross_profit: number;
  net_profit: number;
  profit_margin: number;
  roas: number | null;
};

export type CalendarResult = {
  date: string;
  net_profit: number;
  profit_margin: number;
};

@Service()
export class DailyResultsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/daily-results';

  saveDailyResult(result: DailyResult): Observable<SavedDailyResult> {
    return this.http.post<SavedDailyResult>(this.apiUrl, result);
  }

  getDailyResult(date: string): Observable<SavedDailyResult> {
    return this.http.get<SavedDailyResult>(`${this.apiUrl}/${date}`);
  }

  getCalendarResults(): Observable<CalendarResult[]> {
    return this.http.get<CalendarResult[]>(this.apiUrl);
  }

}