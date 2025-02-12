import { Patient } from "@/types/patient";
import { Card } from "@/components/ui/card";
interface PatientDetailsProps {
  patient: Patient;
}

export default function PatientDetails({ patient }: PatientDetailsProps) {
  return (
    <Card className="mt-5 w-full">
      <div className="flex gap-5 flex-wrap p-5 ">
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
    </Card>
  );
}
