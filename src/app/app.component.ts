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
  revenue = 19.99;
  cogs = 3;
  fees = 9;
  commissions = 10;
  vat = 20;
  shipping = 4;

  get profit() {
    let vat = this.vat / 100;
    let fees = this.fees / 100;
    let commissions = this.commissions / 100;
    let totalVAT = this.revenue * (vat / (vat + 1));
    let totalFees = this.revenue * fees;
    let totalCommissions = this.revenue * commissions;
    return this.revenue * this.orders - (this.cogs + totalVAT + totalFees + totalCommissions + this.shipping + this.adSpend);
  }

}