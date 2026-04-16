import { Worker, TrainingRecord } from './types';

export const MOCK_WORKERS: Worker[] = [
  { dni: '74384798', name: 'MARLON ALEXANDER', lastName: 'RUIZ DELGADO', area: 'GESTIÓN HUMANA' },
  { dni: '12345678', name: 'JUAN PEREZ', lastName: 'GARCIA', area: 'PRODUCCIÓN' },
  { dni: '87654321', name: 'MARIA', lastName: 'LOPEZ', area: 'MANTENIMIENTO' },
];

export const TRAINING_RECORDS: TrainingRecord[] = [
  {
    id: 'TR-001',
    title: 'Inducción de Seguridad y Salud en el Trabajo',
    topics: 'Introducción a la seguridad, IPERC, EPPs',
    exhibitors: 'Ing. Carlos Sanchez',
    institution: 'Aceros Arequipa S.A.',
    date: '2024-04-16',
    startTime: '08:00 AM',
    duration: '4 horas',
    type: 'INDUCCIÓN'
  },
  {
    id: 'TR-002',
    title: 'Capacitación sobre Manejo de Residuos Sólidos',
    topics: 'Clasificación de residuos, código de colores, disposición final',
    exhibitors: 'Lic. Ana Martinez',
    institution: 'Consultores Ambientales',
    date: '2024-04-17',
    startTime: '10:00 AM',
    duration: '2 horas',
    type: 'CAPACITACIÓN'
  },
  {
    id: 'TR-003',
    title: 'Simulacro de Sismo y Tsunami',
    topics: 'Rutas de evacuación, zonas seguras, puntos de reunión',
    exhibitors: 'Comité de Seguridad',
    institution: 'INDECI',
    date: '2024-04-18',
    startTime: '11:00 AM',
    duration: '1 hora',
    type: 'SIMULACRO'
  }
];
