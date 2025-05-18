import { Routes } from '@angular/router';
import { TransactionListComponent } from './features/transactions/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './features/transactions/transaction-form/transaction-form.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistrationComponent } from './features/auth/registration/registration.component';
import { SpendingChartComponent } from './features/dashboard/spending-chart/spending-chart.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'add-transaction', component: TransactionFormComponent },
  { path: 'dashboard', component: SpendingChartComponent },
];
