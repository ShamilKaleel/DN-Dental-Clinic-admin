import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePatient } from "@/hooks/usePatient";
import { Patient } from "@/types/patient";
import PatientDetails from "./patient-details";
import PatientHeader from "./patient-log-book-header";
import PatientLogs from "./patient-logs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLog } from "@/hooks/useLog";

// Import a default image

export default function PatientLog() {
  const { id } = useParams();
  const { getPatientById } = usePatient();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { fetchLogs } = useLog();
  const DEFAULT_IMAGE_URL =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  useEffect(() => {
    const fetchPatient = async () => {
      console.log(id);
      if (id) {
        try {
          const data = await getPatientById(id);
          setPatient(data);
          fetchLogs(data.logs);
        } catch (error) {
          console.error("Error fetching patient details", error);
        }
      }
    };

    fetchPatient();
  }, [id, getPatientById]);

  if (!patient) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div>
      <PatientHeader patientID={patient.id} />
      <PatientDetails patient={patient} />
      <PatientLogs patientID={patient.id} />
    </div>
  );
}
