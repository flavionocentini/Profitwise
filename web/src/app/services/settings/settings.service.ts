import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Settings = {
  id: number;
  revenue_per_order: number;
  cogs: number;
  fees_percentage: number;
  commissions_percentage: number;
  vat_percentage: number;
  shipping: number;
};

export type UpdateSettings = Omit<Settings, 'id'>;

@Service()
export class SettingsService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:3000/settings';

    // Get settings
    getSettings(): Observable<Settings> {
        return this.http.get<Settings>(this.apiUrl);
    }

    // Update settings
    updateSettings(settings: UpdateSettings): Observable<Settings> {
        return this.http.patch<Settings>(this.apiUrl, settings);
    }

}
