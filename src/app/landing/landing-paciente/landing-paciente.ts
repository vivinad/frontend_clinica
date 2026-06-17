import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-paciente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-paciente.html',
  styleUrl: './landing-paciente.css'
})
export class LandingPacienteComponent {

  servicios = [
    { icono: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', titulo: 'Reserva Online', desc: 'Agenda tu cita en minutos desde cualquier dispositivo, sin llamadas ni esperas.' },
    { icono: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', titulo: 'Historial Digital', desc: 'Accede a tus diagnósticos, recetas y resultados de laboratorio en un solo lugar.' },
    { icono: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', titulo: 'Recordatorios', desc: 'Recibe alertas automáticas de tus próximas citas y medicamentos por tomar.' },
    { icono: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', titulo: 'Especialistas', desc: 'Más de 20 médicos especializados disponibles para atenderte cuando lo necesites.' },
  ];

  testimonios = [
    { nombre: 'María García', cargo: 'Paciente desde 2024', texto: 'Reservar mis citas nunca fue tan fácil. Ahorro tiempo y el doctor tiene todo mi historial al instante.', iniciales: 'MG' },
    { nombre: 'Carlos Mendoza', cargo: 'Paciente desde 2023', texto: 'Excelente atención. El sistema de recordatorios me ayuda a no olvidar mis medicamentos diarios.', iniciales: 'CM' },
    { nombre: 'Ana Torres', cargo: 'Paciente desde 2025', texto: 'Por fin una clínica con tecnología moderna. El historial digital es increíblemente útil.', iniciales: 'AT' },
  ];

  constructor(private router: Router) {}

  irAlLogin() { this.router.navigate(['/login']); }
}
