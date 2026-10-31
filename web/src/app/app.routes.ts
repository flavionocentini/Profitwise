import { Routes } from '@angular/router';

import { CalendarComponent } from './pages/calendar/calendar.component';
import { DailyResultComponent } from './pages/daily-result/daily-result.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';

export const routes: Routes = [
    {
        path: '',
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
