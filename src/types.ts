export interface Worker {
  dni: string;
  name: string;
  lastName: string;
  area: string;
}

export type LearningType = 'INDUCCIÓN' | 'CAPACITACIÓN' | 'SIMULACRO' | 'ENTRENAMIENTO' | 'OTROS';

export interface TrainingRecord {
  id: string;
  title: string;
  topics: string;
  exhibitors: string;
  institution: string;
  date: string;
  startTime: string;
  duration: string;
  type: LearningType;
  othersDetail?: string;
}

export interface AttendanceRecord {
  workerDni: string;
  trainingId: string;
  timestamp: string;
  observations?: string;
}
