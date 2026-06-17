import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-marketing-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marketing-dashboard.html',
  styleUrl: './marketing-dashboard.css'
})
export class MarketingDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('chartCanales') chartCanalesRef!: ElementRef;
  @ViewChild('chartConversion') chartConversionRef!: ElementRef;
  @ViewChild('chartRetencion') chartRetencionRef!: ElementRef;
  @ViewChild('chartIngresos') chartIngresosRef!: ElementRef;

  fechaHoy = '';

  stats = [
    { label: 'Nuevos pacientes', valor: '87', cambio: '+12%', positivo: true, color: '#059669', bg: '#ECFDF5' },
    { label: 'Tasa de conversión', valor: '68.3%', cambio: '+5.2%', positivo: true, color: '#7C3AED', bg: '#F5F3FF' },
    { label: 'Costo por paciente', valor: 'S/ 24.50', cambio: '-8%', positivo: true, color: '#2563EB', bg: '#EFF6FF' },
    { label: 'Retención mensual', valor: '91.2%', cambio: '+1.4%', positivo: true, color: '#D97706', bg: '#FFFBEB' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.fechaHoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  ngAfterViewInit() {
    this.crearGraficoCanales();
    this.crearGraficoConversion();
    this.crearGraficoRetencion();
    this.crearGraficoIngresos();
  }

  crearGraficoCanales() {
    new Chart(this.chartCanalesRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Redes sociales', 'Búsqueda web', 'Referidos', 'Llamadas', 'Otros'],
        datasets: [{
          data: [34, 28, 22, 11, 5],
          backgroundColor: ['#2563EB', '#7C3AED', '#059669', '#D97706', '#94A3B8'],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'right' } }
      }
    });
  }

  crearGraficoConversion() {
    new Chart(this.chartConversionRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Visitantes web',
          data: [520, 610, 580, 700, 760, 820],
          backgroundColor: 'rgba(37,99,235,0.2)',
          borderColor: '#2563EB',
          borderWidth: 2,
          borderRadius: 4,
        }, {
          label: 'Nuevos pacientes',
          data: [48, 62, 55, 71, 79, 87],
          backgroundColor: 'rgba(5,150,105,0.8)',
          borderColor: '#059669',
          borderWidth: 0,
          borderRadius: 4,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  crearGraficoRetencion() {
    new Chart(this.chartRetencionRef.nativeElement, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Retención (%)',
          data: [88.5, 89.2, 90.1, 89.8, 90.7, 91.2],
          borderColor: '#D97706',
          backgroundColor: 'rgba(217,119,6,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#D97706',
          pointRadius: 5,
        }]
      },
      options: {
        responsive: true,
        scales: { y: { min: 85, max: 100, ticks: { callback: (v) => v + '%' } } },
        plugins: { legend: { position: 'top' } }
      }
    });
  }

  crearGraficoIngresos() {
    new Chart(this.chartIngresosRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          label: 'Ingresos (S/)',
          data: [32400, 38200, 35600, 42100, 45800, 48200],
          backgroundColor: ['#EFF6FF','#DBEAFE','#BFDBFE','#93C5FD','#60A5FA','#2563EB'],
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: false, min: 25000, ticks: { callback: (v) => 'S/ ' + Number(v).toLocaleString() } } }
      }
    });
  }

  volver() { this.router.navigate(['/login']); }
}
