import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-dashboard.html',
  styleUrl: './doctor-dashboard.css'
})
export class DoctorDashboardComponent implements OnInit {

  constructor(private router: Router) {}

  cerrarSesion() { this.router.navigate(['/login']); }

  Math = Math;
  seccionActiva = 'inicio';
  sidebarCollapsed = false;
  mobileMenuOpen = false;
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

  cambiarSeccion(s: string) { this.seccionActiva = s; this.pacienteSeleccionado = null; this.mobileMenuOpen = false; }

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

  // HISTORIAL: edición
  historialExpandido: any = null;
  entradaEditando: any = null;
  entradaEdit = { fecha: '', diagnostico: '', nota: '' };

  toggleHistorial(p: any) {
    this.historialExpandido = this.historialExpandido === p ? null : p;
    this.entradaEditando = null;
  }

  editarEntrada(h: any) { this.entradaEditando = h; this.entradaEdit = { ...h }; }
  cancelarEdicion() { this.entradaEditando = null; }

  guardarEdicion(p: any, h: any) {
    h.fecha = this.entradaEdit.fecha;
    h.diagnostico = this.entradaEdit.diagnostico;
    h.nota = this.entradaEdit.nota;
    if (p.historial[0] === h) { p.diagnostico = h.diagnostico; p.ultimaVisita = h.fecha; }
    this.entradaEditando = null;
  }

  // FIRMA DIGITAL + PDF (historial, citas y recetas)
  mostrarModalFirma = false;
  tipoPDF = 'historial';
  datosPDF: any = null;
  firmaNombre = 'Dr. Ramírez';
  firmaHecha = false;
  private dibujando = false;

  abrirModalFirma(datos: any, tipo: string = 'historial') {
    this.datosPDF = datos;
    this.tipoPDF = tipo;
    this.mostrarModalFirma = true;
    this.firmaHecha = false;
  }
  cerrarModalFirma() { this.mostrarModalFirma = false; this.datosPDF = null; }

  get nombrePDF(): string { return this.datosPDF?.nombre || this.datosPDF?.paciente || ''; }
  get etiquetaPDF(): string {
    if (this.tipoPDF === 'cita') return 'el comprobante de cita';
    if (this.tipoPDF === 'receta') return 'la receta médica';
    return 'el historial';
  }

  private coordsFirma(e: any, c: HTMLCanvasElement) {
    const r = c.getBoundingClientRect();
    const punto = e.touches ? e.touches[0] : e;
    return {
      x: (punto.clientX - r.left) * (c.width / r.width),
      y: (punto.clientY - r.top) * (c.height / r.height)
    };
  }

  iniciarTrazo(e: any, c: HTMLCanvasElement) {
    e.preventDefault();
    this.dibujando = true;
    const ctx = c.getContext('2d')!;
    ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#1E293B';
    const { x, y } = this.coordsFirma(e, c);
    ctx.beginPath(); ctx.moveTo(x, y);
  }

  trazar(e: any, c: HTMLCanvasElement) {
    if (!this.dibujando) return;
    e.preventDefault();
    const ctx = c.getContext('2d')!;
    const { x, y } = this.coordsFirma(e, c);
    ctx.lineTo(x, y); ctx.stroke();
    this.firmaHecha = true;
  }

  terminarTrazo() { this.dibujando = false; }

  limpiarFirma(c: HTMLCanvasElement) {
    c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
    this.firmaHecha = false;
  }

  descargarPDF(c: HTMLCanvasElement) {
    if (!this.firmaHecha || !this.firmaNombre.trim()) return;
    const d = this.datosPDF;
    const firmaImg = c.toDataURL('image/png');
    const fechaEmision = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    let tituloDoc = 'Historial médico';
    let cuerpo = '';

    if (this.tipoPDF === 'historial') {
      const filas = d.historial.map((h: any) => `
      <tr>
        <td class="td-fecha">${h.fecha}</td>
        <td class="td-dx">${h.diagnostico}</td>
        <td>${h.nota}</td>
      </tr>`).join('');
      cuerpo = `
    <div class="info-paciente">
      <div class="info-item"><div class="lbl">Paciente</div><div class="val">${d.nombre}</div></div>
      <div class="info-item"><div class="lbl">Edad</div><div class="val">${d.edad} años</div></div>
      <div class="info-item"><div class="lbl">Diagnóstico actual</div><div class="val">${d.diagnostico}</div></div>
      <div class="info-item"><div class="lbl">Última visita</div><div class="val">${d.ultimaVisita}</div></div>
    </div>
    <h2>Registros clínicos</h2>
    <table>
      <thead><tr><th>Fecha</th><th>Diagnóstico</th><th>Observaciones</th></tr></thead>
      <tbody>${filas}</tbody>
    </table>`;
    } else if (this.tipoPDF === 'cita') {
      tituloDoc = 'Comprobante de cita';
      cuerpo = `
    <div class="info-paciente">
      <div class="info-item"><div class="lbl">Paciente</div><div class="val">${d.nombre}</div></div>
      <div class="info-item"><div class="lbl">Estado</div><div class="val">${d.estadoLabel}</div></div>
      <div class="info-item"><div class="lbl">Médico tratante</div><div class="val">${this.firmaNombre}</div></div>
    </div>
    <h2>Detalle de la cita</h2>
    <div class="cita-destacado">
      <div class="cita-box"><div class="lbl">Fecha</div><div class="big">${d.fecha}</div></div>
      <div class="cita-box"><div class="lbl">Hora</div><div class="big">${d.hora}</div></div>
      <div class="cita-box"><div class="lbl">Motivo</div><div class="big">${d.motivo}</div></div>
    </div>
    <p class="nota-doc">Por favor preséntese 10 minutos antes de la hora indicada con su documento de identidad. Si no puede asistir, comuníquese con la clínica para reprogramar su cita.</p>`;
    } else {
      tituloDoc = 'Receta médica';
      cuerpo = `
    <div class="info-paciente">
      <div class="info-item"><div class="lbl">Paciente</div><div class="val">${d.paciente}</div></div>
      <div class="info-item"><div class="lbl">Fecha de emisión</div><div class="val">${d.fecha}</div></div>
      <div class="info-item"><div class="lbl">Médico</div><div class="val">${this.firmaNombre}</div></div>
    </div>
    <h2>Prescripción ℞</h2>
    <div class="rx-card">
      <div class="rx-med">${d.medicamento}</div>
      <div class="rx-row"><span class="lbl-inline">Dosis</span> ${d.dosis || '—'}</div>
      <div class="rx-row"><span class="lbl-inline">Duración</span> ${d.duracion || '—'}</div>
      ${d.indicaciones ? `<div class="rx-row"><span class="lbl-inline">Indicaciones</span> ${d.indicaciones}</div>` : ''}
    </div>
    <p class="nota-doc">Receta válida para dispensación en farmacia. No sustituir el medicamento ni modificar la dosis sin autorización del médico tratante.</p>`;
    }

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>${tituloDoc} — ${this.nombrePDF}</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1E293B; background: #fff; padding: 0; }
  .hoja { max-width: 780px; margin: 0 auto; padding: 36px 44px; }
  .encabezado {
    display: flex; justify-content: space-between; align-items: center;
    background: linear-gradient(135deg, #2563EB, #7C3AED);
    color: #fff; border-radius: 14px; padding: 24px 28px; margin-bottom: 28px;
  }
  .logo-wrap { display: flex; align-items: center; gap: 14px; }
  .logo-circulo {
    width: 46px; height: 46px; border-radius: 12px; background: rgba(255,255,255,0.18);
    display: flex; align-items: center; justify-content: center; font-size: 26px; font-weight: 800;
  }
  .clinica-nombre { font-size: 21px; font-weight: 800; letter-spacing: -0.3px; }
  .clinica-sub { font-size: 11px; opacity: 0.85; margin-top: 2px; }
  .doc-tipo { text-align: right; }
  .doc-tipo .titulo { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; }
  .doc-tipo .fecha { font-size: 11px; opacity: 0.85; margin-top: 4px; }
  .info-paciente {
    display: flex; gap: 26px; background: #F1F5F9; border: 1px solid #E2E8F0;
    border-radius: 10px; padding: 16px 22px; margin-bottom: 26px;
  }
  .lbl { font-size: 10px; text-transform: uppercase; letter-spacing: 0.8px; color: #64748B; font-weight: 700; }
  .val { font-size: 14px; font-weight: 600; margin-top: 3px; }
  .cita-destacado { display: flex; gap: 14px; margin-bottom: 24px; }
  .cita-box { flex: 1; border: 1.5px solid #E2E8F0; border-radius: 10px; padding: 14px 18px; text-align: center; }
  .cita-box .big { font-size: 16px; font-weight: 800; color: #2563EB; margin-top: 5px; }
  .rx-card { border: 1.5px solid #E2E8F0; border-left: 5px solid #2563EB; border-radius: 10px; padding: 18px 22px; margin-bottom: 22px; }
  .rx-med { font-size: 18px; font-weight: 800; color: #111827; margin-bottom: 8px; }
  .rx-row { font-size: 13px; margin-top: 7px; }
  .lbl-inline { font-weight: 700; color: #64748B; text-transform: uppercase; font-size: 10px; letter-spacing: 0.6px; margin-right: 8px; }
  .nota-doc { font-size: 11.5px; color: #64748B; background: #F8FAFC; border: 1px dashed #CBD5E1; border-radius: 8px; padding: 10px 14px; margin-bottom: 30px; line-height: 1.5; }
  h2 { font-size: 15px; color: #2563EB; margin-bottom: 12px; border-bottom: 2px solid #E2E8F0; padding-bottom: 8px; }
  table { width: 100%; border-collapse: collapse; font-size: 12.5px; margin-bottom: 40px; }
  th { background: #2563EB; color: #fff; text-align: left; padding: 9px 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; }
  th:first-child { border-radius: 8px 0 0 0; }
  th:last-child { border-radius: 0 8px 0 0; }
  td { padding: 10px 12px; border-bottom: 1px solid #E2E8F0; vertical-align: top; }
  tr:nth-child(even) td { background: #F8FAFC; }
  .td-fecha { white-space: nowrap; color: #64748B; }
  .td-dx { font-weight: 700; }
  .pie-firma { display: flex; justify-content: flex-end; margin-top: 30px; }
  .firma-box { text-align: center; width: 260px; }
  .firma-box img { max-width: 220px; max-height: 80px; }
  .firma-linea { border-top: 1.5px solid #1E293B; margin-top: 4px; padding-top: 8px; }
  .firma-nombre { font-size: 14px; font-weight: 700; }
  .firma-rol { font-size: 11px; color: #64748B; margin-top: 2px; }
  .sello-digital {
    margin-top: 10px; display: inline-block; font-size: 9.5px; color: #2563EB;
    border: 1px solid #BFDBFE; background: #EFF6FF; border-radius: 20px; padding: 4px 12px; font-weight: 600;
  }
  .pie-pagina { margin-top: 46px; text-align: center; font-size: 10px; color: #94A3B8; border-top: 1px solid #E2E8F0; padding-top: 12px; }
  .toolbar {
    position: sticky; top: 0; z-index: 10;
    display: flex; justify-content: center; gap: 12px;
    background: #111827; padding: 12px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }
  .toolbar button {
    display: inline-flex; align-items: center; gap: 8px;
    border: none; border-radius: 9px; padding: 10px 22px;
    font-size: 13.5px; font-weight: 600; cursor: pointer;
    font-family: inherit; color: #fff; transition: opacity 0.15s;
  }
  .toolbar button:hover { opacity: 0.85; }
  .toolbar .btn-descargar { background: linear-gradient(135deg, #2563EB, #7C3AED); }
  .toolbar .btn-imprimir { background: #374151; }
  @media print {
    .toolbar { display: none !important; }
    .hoja { padding: 20px 10px; }
    .encabezado { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    th, tr:nth-child(even) td, .info-paciente, .sello-digital { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"><\/script>
</head>
<body>
  <div class="toolbar">
    <button class="btn-descargar" onclick="descargarArchivo()">⬇ Descargar PDF</button>
    <button class="btn-imprimir" onclick="window.print()">🖨 Imprimir</button>
  </div>
  <script>
    function descargarArchivo() {
      html2pdf().set({
        margin: [8, 6, 8, 6],
        filename: '${tituloDoc} - ${this.nombrePDF}.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(document.querySelector('.hoja')).save();
    }
  <\/script>
  <div class="hoja">
    <div class="encabezado">
      <div class="logo-wrap">
        <div class="logo-circulo">+</div>
        <div>
          <div class="clinica-nombre">MedSystem</div>
          <div class="clinica-sub">Centro Médico Integral · Av. Salud 123, Lima · (01) 555-0199</div>
        </div>
      </div>
      <div class="doc-tipo">
        <div class="titulo">${tituloDoc}</div>
        <div class="fecha">${fechaEmision}</div>
      </div>
    </div>

    ${cuerpo}

    <div class="pie-firma">
      <div class="firma-box">
        <img src="${firmaImg}" alt="Firma del médico">
        <div class="firma-linea">
          <div class="firma-nombre">${this.firmaNombre}</div>
          <div class="firma-rol">Medicina General · MedSystem</div>
        </div>
        <span class="sello-digital">✓ Documento firmado digitalmente — ${fechaEmision}</span>
      </div>
    </div>

    <div class="pie-pagina">
      MedSystem — Centro Médico Integral · Este documento es confidencial y de uso exclusivo del paciente.
    </div>
  </div>
</body>
</html>`;

    const ventana = window.open('', '_blank', 'width=860,height=920');
    if (!ventana) return;
    ventana.document.write(html);
    ventana.document.close();
    this.cerrarModalFirma();
  }

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