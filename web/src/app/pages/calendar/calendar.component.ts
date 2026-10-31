import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DailyResultsService, CalendarResult } from '../../services/daily-results/daily-results.service';

@Component({
  selector: 'app-calendar',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  constructor(private dailyResultsService: DailyResultsService) {}

  // Calendar state
  currentMonth = new Date();
  calendarResults: CalendarResult[] = [];

  loading = true;
  errorMessage = '';

  ngOnInit() {
    this.dailyResultsService.getCalendarResults().subscribe({
      next: (data) => {
        this.calendarResults = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load calendar results';
        this.loading = false;
      }
    });
  }

  // Display the current month and year
  get monthLabel() {
    return this.currentMonth.toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric'
    });
  }

  // Generate all calendar dates, including empty spaces before the first day
  get calendarDays(): (Date | null)[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Set first day of the week to monday
    const startingDay = (firstDay.getDay() + 6) % 7;

    const days: (Date | null)[] = [];

    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  }

  // Move to the previous month
  previousMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
  }

  // Move to the next month
  nextMonth() {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
  }

  // Convert a date into YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  // Find the saved result for a particular date
  getResult(date: Date): CalendarResult | undefined {
    const dateString = this.formatDate(date);

    return this.calendarResults.find(
      result => result.date === dateString
    );
  }

}