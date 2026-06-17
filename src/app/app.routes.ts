import { Routes } from '@angular/router';
import { LoginSelectorComponent } from './login/login-selector/login-selector';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard';
import { PacienteDashboardComponent } from './paciente/paciente-dashboard/paciente-dashboard';
import { SistemasDashboardComponent } from './sistemas/sistemas-dashboard/sistemas-dashboard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginSelectorComponent },
  { path: 'doctor/dashboard', component: DoctorDashboardComponent },
  { path: 'paciente/dashboard', component: PacienteDashboardComponent },
  { path: 'sistemas/dashboard', component: SistemasDashboardComponent },
];
