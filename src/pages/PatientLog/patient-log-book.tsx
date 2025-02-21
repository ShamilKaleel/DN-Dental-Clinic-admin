import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePatient } from "@/hooks/usePatient";
import { Patient } from "@/types/patient";
import PatientDetails from "./patient-details";
import PatientHeader from "./patient-log-book-header";
import PatientLogs from "./patient-logs";
import Lorder from "@/components/Lorder";
import { useLog } from "@/hooks/useLog";

// Import a default image

export default function PatientLogBook() {
  const { id } = useParams();
  const { getPatientById } = usePatient();
  const [patient, setPatient] = useState<Patient | null>(null);
  const { fetchLogs } = useLog();
  const [isLoading, setIsLoading] = useState(true); // Renamed to isLoading

  useEffect(() => {
    const fetchPatient = async () => {
      console.log(id);
      if (id) {
        setIsLoading(true); // Set loading to true before fetching data
        try {
          const data = await getPatientById(id);
          setPatient(data);
          fetchLogs(data.logs);
        } catch (error) {
          console.error("Error fetching patient details", error);
        } finally {
          setIsLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchPatient();
  }, [id, getPatientById]);

  if (isLoading) {
    <div className=" flex w-full h-screen justify-center items-center">
      <Lorder />
    </div>;
  }

  if (!patient) {
    return <p>No patient data found.</p>;
  }

  return (
    <div>
      <PatientHeader patientID={patient.id} />
      <PatientDetails patient={patient} />
      <PatientLogs patientID={patient.id} />
    </div>
  );
}
