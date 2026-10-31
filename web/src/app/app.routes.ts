import { Routes } from '@angular/router';

import { CalendarComponent } from './pages/calendar/calendar.component';
import { DailyResultComponent } from './pages/daily-result/daily-result.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'dashboard',
        component: CalendarComponent
    },
    {
        path: 'calculator',
        component: CalculatorComponent
    },
    {
        path: 'daily-results/:date',
        component: DailyResultComponent
    }
];
