export interface PatientLog {
  id: string;
  actionType: string;
  description: string;
  timestamp: string;
  dentistName: string;
  photos: LogPhoto[];
}

export interface LogPhoto {
  id: string;
  url: string;
  description: string;
  timestamp: string;
}

export interface CreateLog {
  actionType: string;
  description: string;
  dentistId: string;
}
