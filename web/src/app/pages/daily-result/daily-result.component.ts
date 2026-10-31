import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { DailyResultsService, SavedDailyResult } from '../../services/daily-results/daily-results.service';

@Component({
  selector: 'app-daily-result',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './daily-result.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './daily-result.component.css'
})
export class DailyResultComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dailyResultsService: DailyResultsService
  ) {}

  result: SavedDailyResult | null = null;
  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const date = params.get('date');

      if (!date) {
        this.errorMessage = 'No date provided';
        this.loading = false;
        return;
      }

      this.loading = true;
      this.errorMessage = '';
      this.result = null;

      this.dailyResultsService.getDailyResult(date).subscribe({
        next: (data) => {
          this.result = data;
          this.loading = false;
        },
        error: (error) => {
          this.errorMessage = error.status === 404
            ? 'No saved results found for this date'
            : 'Failed to load daily results';

          this.loading = false;
        }
      });
    });
  }
}
