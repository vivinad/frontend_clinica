import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './analytics-dashboard.html',
  styleUrl: './analytics-dashboard.css'
})
export class AnalyticsDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('chartCitas') chartCitasRef!: ElementRef;
  @ViewChild('chartConversion') chartConversionRef!: ElementRef;
  @ViewChild('chartEspecialidades') chartEspecialidadesRef!: ElementRef;
  @ViewChild('chartSatisfaccion') chartSatisfaccionRef!: ElementRef;

  fechaHoy = '';
  seccionActiva = 'resumen';

  stats = [
    { label: 'Pacientes este mes', valor: '342', icono: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Citas completadas', valor: '289', icono: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: '#059669', bg: '#ECFDF5' },
    { label: 'Tasa de conversión', valor: '84.5%', icono: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: '#7C3AED', bg: '#F5F3FF' },
    { label: 'Ingresos del mes', valor: 'S/ 48,200', icono: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 0V5m0 14v-1m0 0v-2m0 2c-1.11 0-2.08-.402-2.599-1', color: '#D97706', bg: '#FFFBEB' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fechaHoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  ngAfterViewInit() {
    this.crearGraficoCitas();
    this.crearGraficoConversion();
    this.crearGraficoEspecialidades();
    this.crearGraficoSatisfaccion();
  }

  crearGraficoCitas() {
    new Chart(this.chartCitasRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Citas agendadas',
          data: [210, 245, 280, 265, 310, 342],
          borderColor: '#2563EB',
          backgroundColor: 'rgba(37,99,235,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#2563EB',
          pointRadius: 5,
        }, {
          label: 'Citas completadas',
          data: [185, 220, 248, 240, 278, 289],
          borderColor: '#059669',
          backgroundColor: 'rgba(5,150,105,0.05)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#059669',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: false, min: 150 } }
      }
    });
  }

  crearGraficoConversion() {
    new Chart(this.chartConversionRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Citas completadas', 'Canceladas', 'No asistieron'],
        datasets: [{
          data: [289, 32, 21],
          backgroundColor: ['#059669', '#EF4444', '#F59E0B'],
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom' },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const total = 342;
                const pct = ((ctx.parsed / total) * 100).toFixed(1);
                return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`;
              }
            }
          }
        }
      }
    });
  }

  crearGraficoEspecialidades() {
    new Chart(this.chartEspecialidadesRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Medicina General', 'Cardiología', 'Neurología', 'Dermatología', 'Traumatología'],
        datasets: [{
          label: 'Citas por especialidad',
          data: [128, 67, 54, 48, 45],
          backgroundColor: ['#2563EB', '#7C3AED', '#059669', '#D97706', '#EF4444'],
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  crearGraficoSatisfaccion() {
    new Chart(this.chartSatisfaccionRef.nativeElement, {
      type: 'radar',
      data: {
        labels: ['Atención', 'Puntualidad', 'Instalaciones', 'Comunicación', 'Precio'],
        datasets: [{
          label: 'Satisfacción pacientes',
          data: [4.6, 4.2, 4.5, 4.7, 4.0],
          borderColor: '#7C3AED',
          backgroundColor: 'rgba(124,58,237,0.15)',
          pointBackgroundColor: '#7C3AED',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        scales: { r: { min: 0, max: 5, ticks: { stepSize: 1 } } },
        plugins: { legend: { position: 'top' } }
      }
    });
  }

  volver() { this.router.navigate(['/sistemas/dashboard']); }

  cerrarSesion() { this.router.navigate(['/login']); }
}
