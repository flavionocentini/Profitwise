import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SettingsService } from './settings.service';
import { DecimalPipe } from '@angular/common';
import { DailyResultsService, DailyResult } from './daily-results.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FormsModule, DecimalPipe],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'profitwise';
  constructor(private settingsService: SettingsService, private dailyResultsService: DailyResultsService) {}

  // Default values
  orders = 0;
  adSpend = 0;

  revenuePerOrder = 0;
  cogs = 0;
  feesPercentage = 0;
  commissionsPercentage = 0;
  vatPercentage = 0;
  shipping = 0;

  // Saving data
  selectedDate = '';
  saveMessage = '';
  saved = false;

  // Calculate gross profit
  get grossProfit() {
    if (this.orders === 0 || this.orders === null) {
      return 0;
    } else {

      let vatValue = this.vatPercentage / 100;
      let feesValue = this.feesPercentage / 100;
      let commissionsValue = this.commissionsPercentage / 100;

      let vat = this.revenuePerOrder * this.orders * (vatValue / (vatValue + 1));
      let fees = this.revenuePerOrder * this.orders * feesValue;
      let commissions = this.revenuePerOrder * this.orders * commissionsValue;

      let profit = this.revenuePerOrder * this.orders - (this.cogs * this.orders + vat + fees + commissions + this.shipping * this.orders);

      return profit;
    }
  }

  // Calculate net profit
  get netProfit() {
    return this.grossProfit - this.adSpend;
  }

  // Calculate total revenue
  get revenue() {
    return this.revenuePerOrder * this.orders;
  }

  // Calculate profit margin
  get profitMargin() {
    if (this.orders === 0 || this.orders === null) {
      return 0;
    } else {
      let profitMargin = (this.netProfit / this.revenue) * 100;
      return profitMargin;
    }
  }

  // Calculate ROAS
  get roas() {
    if (this.adSpend === 0 || this.adSpend === null) {
      return null;
    }
    return this.revenue / this.adSpend;
  }

  // Update settings using the API
  onSettingsChange() {
    //console.log("Settings changed:", this.revenuePerOrder, this.cogs, this.feesPercentage, this.commissionsPercentage, this.vatPercentage, this.shipping);
    this.settingsService.updateSettings({
      revenue_per_order: this.revenuePerOrder,
      cogs: this.cogs,
      fees_percentage: this.feesPercentage,
      commissions_percentage: this.commissionsPercentage,
      vat_percentage: this.vatPercentage,
      shipping: this.shipping,
    }).subscribe();
  }

  // Fetch settings from the API
  ngOnInit() {
    this.settingsService.getSettings().subscribe(data => {
      this.revenuePerOrder = data.revenue_per_order;
      this.cogs = data.cogs;
      this.feesPercentage = data.fees_percentage;
      this.commissionsPercentage = data.commissions_percentage;
      this.vatPercentage = data.vat_percentage;
      this.shipping = data.shipping;
    });
  }

  // Save the daily result
  saveDailyResult() {
    this.saveMessage = '';
    this.saved = false;

    if (!this.selectedDate) {
      return;
    }

    const result: DailyResult = {
      date: this.selectedDate,
      orders: this.orders,
      ad_spend: this.adSpend,
      revenue_per_order: this.revenuePerOrder,
      cogs: this.cogs,
      fees_percentage: this.feesPercentage,
      commissions_percentage: this.commissionsPercentage,
      vat_percentage: this.vatPercentage,
      shipping: this.shipping,
    };

    this.dailyResultsService.saveDailyResult(result).subscribe({
      next: () => {
        //console.log('Daily result saved successfully');
        this.saveMessage = 'Daily results saved';
        this.saved = true;
      },
      error: () => {
        //console.error('Failed to save daily result:', error);
        this.saveMessage = 'Failed to save daily results';
      },
    });
  }

}
