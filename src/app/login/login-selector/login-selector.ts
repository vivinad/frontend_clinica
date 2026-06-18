import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-selector.html',
  styleUrl: './login-selector.css'
})
export class LoginSelectorComponent {

  usuario: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router) {}

  irA(ruta: string): void { this.router.navigate([ruta]); }

  ingresar(): void {
    this.error = '';

    if (!this.usuario || !this.password) {
      this.error = 'Por favor completa todos los campos.';
      return;
    }

    // Simulación sin backend
    if (this.usuario === 'paciente@clinica.com' && this.password === '1234') {
      this.router.navigate(['/paciente/dashboard']);
    } else if (this.usuario === 'doctor@clinica.com' && this.password === '1234') {
      this.router.navigate(['/doctor/dashboard']);
    } else if (this.usuario === 'admin@clinica.com' && this.password === '1234') {
      this.router.navigate(['/sistemas/dashboard']);
    } else {
      this.error = 'Usuario o contraseña incorrectos.';
    }
  }
}