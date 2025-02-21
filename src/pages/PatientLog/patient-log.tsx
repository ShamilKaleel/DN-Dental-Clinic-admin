import React, { useState } from "react";
import { PatientLog } from "@/types/patient-log";
import PatientLogHeader from "./patient-log-header";
import { Skeleton } from "@/components/ui/skeleton";

interface PatientLoggProps {
  log: PatientLog;
  patientID: string;
}

const PatientLogg: React.FC<PatientLoggProps> = ({ log, patientID }) => {
  // State to track loading for each image
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>(
    log.photos.reduce((acc, photo) => {
      acc[photo.id] = true; // Initially, all images are loading
      return acc;
    }, {} as { [key: string]: boolean })
  );

  // Function to handle image load
  const handleImageLoad = (photoId: string) => {
    setLoadingStates((prev) => ({
      ...prev,
      [photoId]: false, // Set loading to false when image is loaded
    }));
  };

  return (
    <>
      <PatientLogHeader patientID={patientID} logID={log.id} />
      <div className="w-full py-6">
        <h2 className="text-2xl font-bold">Action Type: {log.actionType}</h2>
        <p>Description: {log.description}</p>
        <p>Doctor: {log.dentistName}</p>
        <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>

        <div className="mt-4">
          {log.photos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {log.photos.map((photo) => (
                <div key={photo.id} className="relative w-full h-32">
                  {/* Loading Placeholder */}
                  {loadingStates[photo.id] && (
                    <Skeleton className="w-full h-32 object-cover rounded-lg shadow-md   " />
                  )}

                  {/* Image */}
                  <img
                    src={photo.url}
                    alt={photo.description}
                    className={`w-full h-32 object-cover rounded-lg shadow-md cursor-pointer transition-opacity duration-300 ${
                      loadingStates[photo.id] ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => handleImageLoad(photo.id)}
                    onClick={() => window.open(photo.url, "_blank")}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-gray-500">No images available.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PatientLogg;
