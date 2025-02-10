import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePatient } from "@/hooks/usePatient";
import { Patient } from "@/types/patient";
import { Button } from "@/components/ui/button";

export default function PatiebntLogPage() {
  const { id } = useParams();
  const { getPatientById } = usePatient();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const data = await getPatientById(id);
          setPatient(data);
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
      <h1>Patient Details</h1>

      <Button onClick={() => window.print()}>Print</Button>
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

      <h2>Patient Logs</h2>
      {patient.logs.length > 0 ? (
        <ul>
          {patient.logs.map((log) => (
            <li
              key={log.id}
              style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
            >
              <p>
                <strong>Action Type:</strong> {log.actionType}
              </p>
              <p>
                <strong>Description:</strong> {log.description}
              </p>
              <p>
                <strong>Timestamp:</strong>{" "}
                {new Date(log.timestamp).toLocaleString()}
              </p>
              <p>
                <strong>Dentist:</strong> {log.dentistName}
              </p>

              {log.photos.length > 0 && (
                <div>
                  <h3>Photos:</h3>
                  <div
                    style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
                  >
                    {log.photos.map((photo) => (
                      <div key={photo.id} style={{ textAlign: "center" }}>
                        <img
                          src={photo.url}
                          alt={photo.description}
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                        <p style={{ fontSize: "12px", color: "#666" }}>
                          {photo.description}
                        </p>
                        <p style={{ fontSize: "10px", color: "#999" }}>
                          {new Date(photo.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No logs available.</p>
      )}
    </div>
  );
}
