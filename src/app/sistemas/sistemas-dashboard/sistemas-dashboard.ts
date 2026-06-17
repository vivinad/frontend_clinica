import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sistemas-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sistemas-dashboard.html',
  styleUrl: './sistemas-dashboard.css'
})
export class SistemasDashboardComponent implements OnInit {

  Math = Math;
  seccionActiva = 'inicio';
  sidebarCollapsed = false;
  fechaHoy = '';

  get tituloSeccion(): string {
    const t: any = {
      inicio: 'Panel de administración', doctores: 'Gestión de doctores',
      pacientes: 'Gestión de pacientes', medicamentos: 'Inventario de medicamentos'
    };
    return t[this.seccionActiva] || '';
  }

  cambiarSeccion(s: string) {
    this.seccionActiva = s;
    this.mostrarFormDoctor = false;
    this.mostrarFormMed = false;
  }

  constructor(private router: Router) {}

  // ── DOCTORES ──
  mostrarFormDoctor = false;
  nuevoDoctor = { nombre: '', especialidad: '', email: '', telefono: '' };
  doctores = [
    { nombre: 'Dr. Ramírez', especialidad: 'Medicina General', email: 'ramirez@clinica.com', pacientes: 142, estado: 'activo' },
    { nombre: 'Dra. Vega', especialidad: 'Cardiología', email: 'vega@clinica.com', pacientes: 89, estado: 'activo' },
    { nombre: 'Dr. Torres', especialidad: 'Neurología', email: 'torres@clinica.com', pacientes: 65, estado: 'activo' },
    { nombre: 'Dra. López', especialidad: 'Dermatología', email: 'lopez@clinica.com', pacientes: 110, estado: 'inactivo' },
    { nombre: 'Dr. Mora', especialidad: 'Traumatología', email: 'mora@clinica.com', pacientes: 77, estado: 'activo' },
  ];

  registrarDoctor() {
    if (!this.nuevoDoctor.nombre || !this.nuevoDoctor.especialidad) return;
    this.doctores.push({ ...this.nuevoDoctor, pacientes: 0, estado: 'activo' });
    this.nuevoDoctor = { nombre: '', especialidad: '', email: '', telefono: '' };
    this.mostrarFormDoctor = false;
  }

  toggleEstadoDoctor(doc: any) {
    doc.estado = doc.estado === 'activo' ? 'inactivo' : 'activo';
  }

  // ── PACIENTES ──
  busquedaPaciente = '';
  pacientes = [
    { nombre: 'Ana Martínez', edad: 34, diagnostico: 'Hipertensión', doctor: 'Dr. Ramírez', ultimaVisita: '10/06/2026', estado: 'activo' },
    { nombre: 'Luis Castillo', edad: 52, diagnostico: 'Diabetes tipo 2', doctor: 'Dr. Ramírez', ultimaVisita: '05/06/2026', estado: 'activo' },
    { nombre: 'Sara Ríos', edad: 28, diagnostico: 'Control general', doctor: 'Dr. Ramírez', ultimaVisita: '16/06/2026', estado: 'activo' },
    { nombre: 'Carlos Vega', edad: 45, diagnostico: 'Migraña crónica', doctor: 'Dr. Torres', ultimaVisita: '02/06/2026', estado: 'activo' },
    { nombre: 'María Flores', edad: 61, diagnostico: 'Hipertensión', doctor: 'Dr. Ramírez', ultimaVisita: '17/06/2026', estado: 'activo' },
    { nombre: 'Jorge Pérez', edad: 38, diagnostico: 'Gastritis', doctor: 'Dra. López', ultimaVisita: '01/05/2026', estado: 'inactivo' },
    { nombre: 'Rosa Méndez', edad: 55, diagnostico: 'Artritis', doctor: 'Dr. Mora', ultimaVisita: '25/05/2026', estado: 'activo' },
  ];

  get pacientesFiltrados() {
    return this.pacientes.filter(p =>
      p.nombre.toLowerCase().includes(this.busquedaPaciente.toLowerCase()) ||
      p.diagnostico.toLowerCase().includes(this.busquedaPaciente.toLowerCase())
    );
  }

  // ── MEDICAMENTOS ──
  mostrarFormMed = false;
  busquedaMed = '';
  nuevoMed = { nombre: '', categoria: '', stock: 0, precio: '' };
  medicamentos = [
    { nombre: 'Paracetamol 500mg', categoria: 'Analgésico', stock: 150, precio: '2.50', umbral: 20 },
    { nombre: 'Amoxicilina 500mg', categoria: 'Antibiótico', stock: 80, precio: '5.00', umbral: 15 },
    { nombre: 'Ibuprofeno 400mg', categoria: 'Antiinflamatorio', stock: 12, precio: '3.00', umbral: 20 },
    { nombre: 'Metformina 850mg', categoria: 'Antidiabético', stock: 60, precio: '4.50', umbral: 20 },
    { nombre: 'Losartán 50mg', categoria: 'Antihipertensivo', stock: 3, precio: '6.00', umbral: 20 },
    { nombre: 'Omeprazol 20mg', categoria: 'Gastroprotector', stock: 95, precio: '3.50', umbral: 15 },
    { nombre: 'Atorvastatina 20mg', categoria: 'Hipolipemiante', stock: 45, precio: '7.00', umbral: 15 },
    { nombre: 'Sumatriptán 50mg', categoria: 'Antimigranoso', stock: 8, precio: '12.00', umbral: 10 },
    { nombre: 'Enalapril 10mg', categoria: 'Antihipertensivo', stock: 120, precio: '4.00', umbral: 20 },
  ];

  get medicamentosFiltrados() {
    return this.medicamentos.filter(m =>
      m.nombre.toLowerCase().includes(this.busquedaMed.toLowerCase()) ||
      m.categoria.toLowerCase().includes(this.busquedaMed.toLowerCase())
    );
  }

  get medCriticos() { return this.medicamentos.filter(m => m.stock <= m.umbral); }

  agregarStock(m: any, cant: number) { m.stock = Math.max(0, m.stock + cant); }

  registrarMed() {
    if (!this.nuevoMed.nombre || !this.nuevoMed.categoria) return;
    this.medicamentos.push({ ...this.nuevoMed, umbral: 20 });
    this.nuevoMed = { nombre: '', categoria: '', stock: 0, precio: '' };
    this.mostrarFormMed = false;
  }

  iniciales(nombre: string): string {
    return nombre.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
  }

  cerrarSesion() { this.router.navigate(['/login']); }

  ngOnInit() {
    this.fechaHoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
