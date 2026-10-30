import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SettingsService } from './settings.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FormsModule],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'profitwise';
  constructor(private settingsService: SettingsService) {}

  // Default values
  orders = 0;
  adSpend = 0;

  revenuePerOrder = 0;
  cogs = 0;
  feesPercentage = 0;
  commissionsPercentage = 0;
  vatPercentage = 0;
  shipping = 0;

  // Calculate profit
  get profit() {
    
    let vatValue = this.vatPercentage / 100;
    let feesValue = this.feesPercentage / 100;
    let commissionsValue = this.commissionsPercentage / 100;

    let vat = this.revenuePerOrder * this.orders * (vatValue / (vatValue + 1));
    let fees = this.revenuePerOrder * this.orders * feesValue;
    let commissions = this.revenuePerOrder * this.orders * commissionsValue;

    let profit = this.revenuePerOrder * this.orders - (this.cogs + vat + fees + commissions + this.shipping + this.adSpend);

    if (this.orders === 0) {
      return 0;
    } else {
      return profit;
    }
  }

  // Calculate total revenue
  get revenue() {
    return this.revenuePerOrder * this.orders;
  }

  // Calculate profit margin
  get profitMargin() {

    let profitMargin = (this.profit / this.revenue) * 100;

    if (this.orders === 0) {
      return 0;
    } else {
      return profitMargin.toFixed(2);
    }
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

}
