import { Routes } from '@angular/router';
import { LoginSelectorComponent } from './login/login-selector/login-selector';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginSelectorComponent },
  { path: 'doctor/dashboard', component: DoctorDashboardComponent },
];