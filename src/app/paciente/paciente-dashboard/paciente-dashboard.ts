import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paciente-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paciente-dashboard.html',
  styleUrl: './paciente-dashboard.css'
})
export class PacienteDashboardComponent implements OnInit {

  seccionActiva = 'inicio';
  sidebarCollapsed = false;
  mobileMenuOpen = false;
  fechaHoy = '';

  get tituloSeccion(): string {
    const t: any = {
      inicio: 'Mi Panel', reservar: 'Reservar cita',
      recetas: 'Mis recetas', historial: 'Mi historial', perfil: 'Mi perfil'
    };
    return t[this.seccionActiva] || '';
  }

  cambiarSeccion(s: string) { this.seccionActiva = s; this.mobileMenuOpen = false; }

  constructor(private router: Router) {}

  // PRÓXIMAS CITAS
  citasProximas = [
    { doctor: 'Dr. Ramírez', especialidad: 'Medicina General', fecha: '20/06/2026', hora: '10:00', motivo: 'Control mensual', estado: 'confirmada', estadoLabel: 'Confirmada' },
    { doctor: 'Dra. Vega', especialidad: 'Cardiología', fecha: '28/06/2026', hora: '09:30', motivo: 'Revisión corazón', estado: 'pendiente', estadoLabel: 'Pendiente' },
  ];

  // RECETAS
  recetas = [
    { medicamento: 'Enalapril 10mg', doctor: 'Dr. Ramírez', dosis: '1 vez al día', duracion: '30 días', fecha: '10/06/2026', activa: true, indicaciones: 'Tomar en ayunas por la mañana.' },
    { medicamento: 'Metformina 850mg', doctor: 'Dr. Ramírez', dosis: '2 veces al día', duracion: '60 días', fecha: '05/06/2026', activa: true, indicaciones: 'Tomar con las comidas principales.' },
    { medicamento: 'Ibuprofeno 400mg', doctor: 'Dr. Pérez', dosis: 'Cada 8 horas', duracion: '5 días', fecha: '01/05/2026', activa: false, indicaciones: 'Tomar con alimentos. No exceder 3 dosis al día.' },
  ];

  // HISTORIAL
  historial = [
    { fecha: '10/06/2026', doctor: 'Dr. Ramírez', especialidad: 'Medicina General', diagnostico: 'Hipertensión arterial', nota: 'Presión 140/90. Se ajusta medicación. Control en 1 mes.' },
    { fecha: '15/04/2026', doctor: 'Dr. Ramírez', especialidad: 'Medicina General', diagnostico: 'Control de rutina', nota: 'Paciente estable. Continúa tratamiento habitual.' },
    { fecha: '10/02/2026', doctor: 'Dra. Vega', especialidad: 'Cardiología', diagnostico: 'Evaluación cardiológica', nota: 'ECG normal. Función cardíaca dentro de parámetros.' },
    { fecha: '05/12/2025', doctor: 'Dr. Ramírez', especialidad: 'Medicina General', diagnostico: 'Infección respiratoria', nota: 'Prescripción antibiótico 7 días. Reposo relativo.' },
  ];

  // RESERVAR CITA
  doctores = [
    { id: 1, nombre: 'Dr. Ramírez', especialidad: 'Medicina General', foto: 'RM', disponible: true },
    { id: 2, nombre: 'Dra. Vega', especialidad: 'Cardiología', foto: 'DV', disponible: true },
    { id: 3, nombre: 'Dr. Torres', especialidad: 'Neurología', foto: 'DT', disponible: true },
    { id: 4, nombre: 'Dra. López', especialidad: 'Dermatología', foto: 'DL', disponible: false },
    { id: 5, nombre: 'Dr. Mora', especialidad: 'Traumatología', foto: 'DM', disponible: true },
  ];

  doctorSeleccionado: any = null;
  fechaSeleccionada = '';
  horaSeleccionada = '';
  motivoCita = '';
  pasoCita = 1;
  citaConfirmada = false;

  horasDisponibles = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00'];
  horasOcupadas = ['09:00', '10:30', '15:00'];

  seleccionarDoctor(doc: any) {
    if (!doc.disponible) return;
    this.doctorSeleccionado = doc;
    this.pasoCita = 2;
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
  }

  seleccionarHora(h: string) {
    if (this.horasOcupadas.includes(h)) return;
    this.horaSeleccionada = h;
  }

  confirmarCita() {
    if (!this.fechaSeleccionada || !this.horaSeleccionada) return;
    this.citaConfirmada = true;
    this.citasProximas.unshift({
      doctor: this.doctorSeleccionado.nombre,
      especialidad: this.doctorSeleccionado.especialidad,
      fecha: this.fechaSeleccionada,
      hora: this.horaSeleccionada,
      motivo: this.motivoCita || 'Consulta general',
      estado: 'pendiente',
      estadoLabel: 'Pendiente'
    });
    setTimeout(() => {
      this.citaConfirmada = false;
      this.pasoCita = 1;
      this.doctorSeleccionado = null;
      this.fechaSeleccionada = '';
      this.horaSeleccionada = '';
      this.motivoCita = '';
    }, 3500);
  }

  recetaAbierta: any = null;
  toggleReceta(r: any) { this.recetaAbierta = this.recetaAbierta === r ? null : r; }

  iniciales(nombre: string): string {
    return nombre.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  }

  cerrarSesion() { this.router.navigate(['/login']); }

  ngOnInit() {
    this.fechaHoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
