import { Routes } from '@angular/router';
import { LoginSelectorComponent } from './login/login-selector/login-selector';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard';
import { PacienteDashboardComponent } from './paciente/paciente-dashboard/paciente-dashboard';
import { SistemasDashboardComponent } from './sistemas/sistemas-dashboard/sistemas-dashboard';
import { AnalyticsDashboardComponent } from './analytics/analytics-dashboard/analytics-dashboard';
import { MarketingDashboardComponent } from './marketing/marketing-dashboard/marketing-dashboard';
import { LandingPacienteComponent } from './landing/landing-paciente/landing-paciente';
import { LandingDoctorComponent } from './landing/landing-doctor/landing-doctor';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginSelectorComponent },
  { path: 'doctor/dashboard', component: DoctorDashboardComponent },
  { path: 'paciente/dashboard', component: PacienteDashboardComponent },
  { path: 'sistemas/dashboard', component: SistemasDashboardComponent },
  { path: 'analytics', component: AnalyticsDashboardComponent },
  { path: 'marketing', component: MarketingDashboardComponent },
  { path: 'landing/paciente', component: LandingPacienteComponent },
  { path: 'landing/doctor', component: LandingDoctorComponent },
];
