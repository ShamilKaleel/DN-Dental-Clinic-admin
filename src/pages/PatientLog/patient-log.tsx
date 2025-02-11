import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePatient } from "@/hooks/usePatient";
import { Patient } from "@/types/patient";
import PatientDetails from "./patient-details";
import PatientHeader from "./patient-header";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import a default image

export default function PatientLog() {
  const { id } = useParams();
  const { getPatientById } = usePatient();
  const [patient, setPatient] = useState<Patient | null>(null);
  const DEFAULT_IMAGE_URL =
    "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

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
      <PatientHeader />
      <PatientDetails patient={patient} />

      <h2 className="text-2xl font-bold mt-6 mb-4">Patient Logs</h2>
      {patient.logs.length > 0 ? (
        <div className="space-y-6">
          {patient.logs.map((log) => (
            <Card key={log.id} className="p-4">
              <CardContent>
                <div className="mb-4">
                  <p className="font-semibold">Action Type: {log.actionType}</p>
                  <p>Description: {log.description}</p>
                  <p>Timestamp: {new Date(log.timestamp).toLocaleString()}</p>
                  <p>Dentist: {log.dentistName}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Photos:</h3>
                  <Carousel
                    opts={{
                      align: "start",
                    }}
                    className="w-full max-w-sm"
                  >
                    <CarouselContent>
                      {log.photos.length > 0 ? (
                        log.photos.map((photo) => (
                          <CarouselItem
                            key={photo.id}
                            className="md:basis-1/2 lg:basis-1/3"
                          >
                            <div className="p-1">
                              <Card>
                                <CardContent className="flex flex-col items-center justify-center p-2">
                                  <img
                                    src={photo.url}
                                    alt={photo.description}
                                    className="w-full h-32 object-cover rounded-md"
                                  />
                                  <p className="text-sm text-center mt-2">
                                    {photo.description}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(photo.timestamp).toLocaleString()}
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))
                      ) : (
                        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex flex-col items-center justify-center p-2">
                                <img
                                  src={DEFAULT_IMAGE_URL}
                                  alt="No photo available"
                                  className="w-full  object-cover rounded-md"
                                />
                                <p className="text-sm text-center mt-2">
                                  No photo available
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p>No logs available.</p>
      )}
    </div>
  );
}
