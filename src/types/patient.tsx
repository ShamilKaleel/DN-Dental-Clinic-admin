import { PatientLog } from "./patient-log";

export interface Patient {
  id: string;
  name: string;
  email: string;
  nic: string;
  contactNumbers: string[];
  logs: PatientLog[];
}

export interface CreatePatient {
  name: string;
  email: string;
  nic: string;
  contactNumbers: string[];
}
export interface UpdatePatient {
  id: string;
  name: string;
  email: string;
  nic: string;
  contactNumbers: string[];
}
