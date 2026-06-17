import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-doctor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-doctor.html',
  styleUrl: './landing-doctor.css'
})
export class LandingDoctorComponent {

  beneficios = [
    { icono: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', titulo: 'Gestión de Citas', desc: 'Visualiza y organiza todas tus citas del día en un panel claro y eficiente.' },
    { icono: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', titulo: 'Fichas de Pacientes', desc: 'Accede al historial completo de cada paciente con un solo clic, sin papeles.' },
    { icono: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', titulo: 'Recetas Digitales', desc: 'Emite recetas electrónicas y diagnósticos que el paciente recibe al instante.' },
    { icono: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', titulo: 'Estadísticas', desc: 'Consulta métricas de atención, tiempos y satisfacción de tus pacientes.' },
  ];

  especialidades = [
    'Medicina General', 'Cardiología', 'Neurología',
    'Dermatología', 'Traumatología', 'Pediatría',
    'Ginecología', 'Psiquiatría', 'Endocrinología',
  ];

  constructor(private router: Router) {}

  irAlLogin() { this.router.navigate(['/login']); }
}
