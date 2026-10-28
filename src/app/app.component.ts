import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'profitwise';

  orders = 0;
  adSpend = 0;

  revenuePerOrder = 19.99;
  cogs = 3;
  feesPercentage = 9;
  commissionsPercentage = 10;
  vatPercentage = 20;
  shipping = 4;

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

  get revenue() {
    return this.revenuePerOrder * this.orders;
  }

  get profitMargin() {

    let profitMargin = (this.profit / this.revenue) * 100;

    if (this.orders === 0) {
      return 0;
    } else {
      return profitMargin.toFixed(2);
    }
  }

  onSettingsChange() {
    console.log("Settings changed:", this.revenuePerOrder, this.cogs, this.feesPercentage, this.commissionsPercentage, this.vatPercentage, this.shipping);
  }

}
