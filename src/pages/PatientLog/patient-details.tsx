import { Patient } from "@/types/patient";

interface PatientDetailsProps {
  patient: Patient;
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
  return (
    <div>
      <p>
        <strong>ID:</strong> {patient.id}
      </p>
      <p>
        <strong>Name:</strong> {patient.name}
      </p>
      <p>
        <strong>Email:</strong> {patient.email}
      </p>
      <p>
        <strong>NIC:</strong> {patient.nic}
      </p>
      <p>
        <strong>Contact Numbers:</strong> {patient.contactNumbers.join(", ")}
      </p>
    </div>
  );
}
