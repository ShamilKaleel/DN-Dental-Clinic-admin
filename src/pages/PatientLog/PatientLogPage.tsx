import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useLog } from "@/hooks/useLog";
import { PatientLog } from "@/types/patient-log";
import AddImageComponent from "./patient-log-add-image";
import { Card } from "@/components/ui/card";

const PatientLogDetails = () => {
  const { id, logID } = useParams<{
    id: string;
    logID: string;
  }>();
  const { getLogById } = useLog();
  const [log, setLog] = useState<PatientLog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLog = async () => {
      try {
        const logData = await getLogById(id!, logID!);
        setLog(logData);
      } catch (error) {
        console.error("Error fetching log:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, [id, logID, getLogById]);

  if (loading) return <p>Loading...</p>;
  if (!log) return <p>No log found.</p>;

  return (
    <div className="w-full p-6  ">
      <h2 className="text-2xl font-bold ">Action Type: {log.actionType}</h2>
      <p className="">Description: {log.description}</p>
      <p className="">Docter: {log.dentistName}</p>
      <p className="">Timestamp: {new Date(log.timestamp).toLocaleString()}</p>

      <div className="mt-4">
        {log.photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {log.photos.map((photo) => (
              <img
                key={photo.id}
                src={photo.url}
                alt={photo.description}
                className="w-full h-32 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-gray-500">No images available.</p>
            <AddImageComponent patientID={id!} logID={logID!} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientLogDetails;
