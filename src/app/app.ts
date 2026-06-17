import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginSelectorComponent } from './login/login-selector/login-selector';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginSelectorComponent,
    DoctorDashboardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent { }