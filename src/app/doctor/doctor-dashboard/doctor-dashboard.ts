import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css'
})
export class DoctorDashboardComponent implements OnInit {

  seccionActiva = 'inicio';
  sidebarCollapsed = false;
  fechaHoy = '';
  imageExt = '.png';
  tabCitas = 'todas';

  get tituloSeccion(): string {
    const t: any = {
      inicio: 'Dashboard', citas: 'Citas', pacientes: 'Pacientes',
      historial: 'Historial médico', recetas: 'Recetas',
      derivaciones: 'Derivaciones', inventario: 'Inventario', estadisticas: 'Estadísticas'
    };
    return t[this.seccionActiva] || '';
  }

  cambiarSeccion(s: string) { this.seccionActiva = s; this.pacienteSeleccionado = null; }

  // CITAS
  mostrarFormCita = false;
  nuevaCita = { paciente: '', fecha: '', hora: '', motivo: '' };

  citasHoy = [
    { nombre: 'Ana Martínez', iniciales: 'AM', hora: '09:00', motivo: 'Control mensual', estado: 'confirmada', estadoLabel: 'Confirmada', fecha: '16/06/2026' },
    { nombre: 'Luis Castillo', iniciales: 'LC', hora: '10:30', motivo: 'Revisión exámenes', estado: 'pendiente', estadoLabel: 'Pendiente', fecha: '16/06/2026' },
    { nombre: 'Sara Ríos', iniciales: 'SR', hora: '12:00', motivo: 'Primera consulta', estado: 'confirmada', estadoLabel: 'Confirmada', fecha: '16/06/2026' },
  ];

  todasLasCitas = [
    ...this.citasHoy,
    { nombre: 'Carlos Vega', iniciales: 'CV', hora: '09:00', motivo: 'Dolor de cabeza', estado: 'confirmada', estadoLabel: 'Confirmada', fecha: '17/06/2026' },
    { nombre: 'María Flores', iniciales: 'MF', hora: '11:00', motivo: 'Control presión', estado: 'pendiente', estadoLabel: 'Pendiente', fecha: '17/06/2026' },
    { nombre: 'Jorge Pérez', iniciales: 'JP', hora: '15:00', motivo: 'Seguimiento', estado: 'cancelada', estadoLabel: 'Cancelada', fecha: '15/06/2026' },
  ];

  get citasFiltradas() {
    if (this.tabCitas === 'hoy') return this.citasHoy;
    if (this.tabCitas === 'pendientes') return this.todasLasCitas.filter(c => c.estado === 'pendiente');
    return this.todasLasCitas;
  }

  registrarCita() {
    if (!this.nuevaCita.paciente || !this.nuevaCita.fecha || !this.nuevaCita.hora) return;
    const iniciales = this.nuevaCita.paciente.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    this.todasLasCitas.push({
      nombre: this.nuevaCita.paciente, iniciales,
      hora: this.nuevaCita.hora, motivo: this.nuevaCita.motivo || 'Consulta general',
      estado: 'pendiente', estadoLabel: 'Pendiente', fecha: this.nuevaCita.fecha
    });
    this.nuevaCita = { paciente: '', fecha: '', hora: '', motivo: '' };
    this.mostrarFormCita = false;
  }

  // PACIENTES
  busquedaPaciente = '';
  pacienteSeleccionado: any = null;

  pacientes = [
    { nombre: 'Ana Martínez', iniciales: 'AM', edad: 34, diagnostico: 'Hipertensión', ultimaVisita: '10/06/2026',
      historial: [
        { fecha: '10/06/2026', diagnostico: 'Hipertensión', nota: 'Presión 140/90, se ajusta medicación' },
        { fecha: '15/04/2026', diagnostico: 'Control rutina', nota: 'Paciente estable, continúa tratamiento' },
      ]},
    { nombre: 'Luis Castillo', iniciales: 'LC', edad: 52, diagnostico: 'Diabetes tipo 2', ultimaVisita: '05/06/2026',
      historial: [
        { fecha: '05/06/2026', diagnostico: 'Diabetes tipo 2', nota: 'Glucosa en 180, se recomienda dieta estricta' },
        { fecha: '01/03/2026', diagnostico: 'Control diabetes', nota: 'Hemoglobina glicosilada 7.8%' },
      ]},
    { nombre: 'Sara Ríos', iniciales: 'SR', edad: 28, diagnostico: 'Primera consulta', ultimaVisita: '16/06/2026',
      historial: [{ fecha: '16/06/2026', diagnostico: 'Primera consulta', nota: 'Sin antecedentes relevantes' }]},
    { nombre: 'Carlos Vega', iniciales: 'CV', edad: 45, diagnostico: 'Migraña crónica', ultimaVisita: '02/06/2026',
      historial: [{ fecha: '02/06/2026', diagnostico: 'Migraña', nota: 'Se prescribe sumatriptán 50mg' }]},
    { nombre: 'María Flores', iniciales: 'MF', edad: 61, diagnostico: 'Hipertensión', ultimaVisita: '17/06/2026',
      historial: [{ fecha: '17/06/2026', diagnostico: 'Control presión', nota: 'Presión 150/95, se ajusta dosis' }]},
  ];

  get pacientesFiltrados() {
    return this.pacientes.filter(p => p.nombre.toLowerCase().includes(this.busquedaPaciente.toLowerCase()));
  }

  verPaciente(p: any) { this.pacienteSeleccionado = p; }

  // RECETAS
  mostrarFormReceta = false;
  nuevaReceta = { paciente: '', medicamento: '', dosis: '', duracion: '', indicaciones: '' };
  recetas = [
    { paciente: 'Ana Martínez', iniciales: 'AM', medicamento: 'Enalapril 10mg', dosis: '1 vez al día', duracion: '30 días', fecha: '10/06/2026' },
    { paciente: 'Luis Castillo', iniciales: 'LC', medicamento: 'Metformina 850mg', dosis: '2 veces al día', duracion: '60 días', fecha: '05/06/2026' },
    { paciente: 'Carlos Vega', iniciales: 'CV', medicamento: 'Sumatriptán 50mg', dosis: 'Al inicio del dolor', duracion: '10 usos', fecha: '02/06/2026' },
  ];

  guardarReceta() {
    if (!this.nuevaReceta.paciente || !this.nuevaReceta.medicamento) return;
    const iniciales = this.nuevaReceta.paciente.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);
    const hoy = new Date().toLocaleDateString('es-PE');
    this.recetas.push({ ...this.nuevaReceta, iniciales, fecha: hoy });
    this.nuevaReceta = { paciente: '', medicamento: '', dosis: '', duracion: '', indicaciones: '' };
    this.mostrarFormReceta = false;
  }

  // DERIVACIONES
  derivacion = { paciente: '', especialidad: '', motivo: '', prioridad: 'Normal' };
  derivacionExitosa = false;

  registrarDerivacion() {
    if (!this.derivacion.paciente || !this.derivacion.especialidad) return;
    this.derivacionExitosa = true;
    setTimeout(() => {
      this.derivacionExitosa = false;
      this.derivacion = { paciente: '', especialidad: '', motivo: '', prioridad: 'Normal' };
    }, 3000);
  }

  // INVENTARIO
  busquedaMed = '';
  medicamentos = [
    { nombre: 'Paracetamol 500mg', categoria: 'Analgésico', stock: 150, precio: '2.50' },
    { nombre: 'Amoxicilina 500mg', categoria: 'Antibiótico', stock: 80, precio: '5.00' },
    { nombre: 'Ibuprofeno 400mg', categoria: 'Antiinflamatorio', stock: 12, precio: '3.00' },
    { nombre: 'Metformina 850mg', categoria: 'Antidiabético', stock: 60, precio: '4.50' },
    { nombre: 'Losartán 50mg', categoria: 'Antihipertensivo', stock: 3, precio: '6.00' },
    { nombre: 'Omeprazol 20mg', categoria: 'Gastroprotector', stock: 95, precio: '3.50' },
    { nombre: 'Atorvastatina 20mg', categoria: 'Hipolipemiante', stock: 45, precio: '7.00' },
    { nombre: 'Sumatriptán 50mg', categoria: 'Antimigranoso', stock: 8, precio: '12.00' },
    { nombre: 'Enalapril 10mg', categoria: 'Antihipertensivo', stock: 120, precio: '4.00' },
  ];

  get medicamentosFiltrados() {
    return this.medicamentos.filter(m => m.nombre.toLowerCase().includes(this.busquedaMed.toLowerCase()));
  }

  // ESTADISTICAS
  diagnosticosFrecuentes = [
    { nombre: 'Hipertensión arterial', porcentaje: 32, casos: 28 },
    { nombre: 'Diabetes tipo 2', porcentaje: 24, casos: 21 },
    { nombre: 'Migraña', porcentaje: 18, casos: 16 },
    { nombre: 'Infecciones respiratorias', porcentaje: 14, casos: 12 },
    { nombre: 'Gastritis', porcentaje: 12, casos: 10 },
  ];

  // CHAT IA
  chatAbierto = false;
  mensajeIA = '';
  cargandoIA = false;
  mensajesChat: { rol: string, texto: string }[] = [
    { rol: 'ia', texto: '¡Hola doctor! Soy tu asistente IA. Puedo ayudarte a redactar notas médicas, recetas o resumir historiales. ¿En qué te ayudo?' }
  ];

  toggleChat() { this.chatAbierto = !this.chatAbierto; }

  sugerencia(texto: string) { this.mensajeIA = texto; this.enviarMensajeIA(); }

  async enviarMensajeIA() {
    if (!this.mensajeIA.trim()) return;
    const texto = this.mensajeIA;
    this.mensajesChat.push({ rol: 'usuario', texto });
    this.mensajeIA = '';
    this.cargandoIA = true;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          system: 'Eres un asistente médico profesional que ayuda a doctores. Redactas notas médicas, recetas y resúmenes de historial clínico de forma clara y concisa en español. No diagnosticas enfermedades, solo ayudas con documentación médica.',
          messages: [{ role: 'user', content: texto }]
        })
      });
      const data = await res.json();
      this.mensajesChat.push({ rol: 'ia', texto: data.content?.[0]?.text || 'No pude procesar tu solicitud.' });
    } catch {
      this.mensajesChat.push({ rol: 'ia', texto: 'Error al conectar. Intenta de nuevo.' });
    }
    this.cargandoIA = false;
  }

  ngOnInit() {
    this.fechaHoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}