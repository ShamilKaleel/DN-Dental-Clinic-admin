import { useLog } from "@/hooks/useLog";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, SquarePen, Trash2, Copy } from "lucide-react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import LogDeleteForm from "@/components/forms/log-delete-from";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";

interface PatientLogsProps {
  patientID: string;
}
const PatientLogs: React.FC<PatientLogsProps> = ({ patientID }) => {
  const { logState } = useLog();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  if (!logState) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-5">
      {index != null && (
        <ResponsiveDialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          title="Delete Patient"
          description="Are you sure you want to delete this Patient?"
        >
          <LogDeleteForm
            patientId={patientID}
            logId={logState.logs[index].id}
            setIsOpen={setIsDeleteOpen}
          />
        </ResponsiveDialog>
      )}
      <Carousel className=" md:w-full mt-5 max-w-screen-lg lg:max-w-screen-xl">
        <CarouselContent className="-ml-1">
          {logState.logs.map((log, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <Link to={`/patient/${patientID}/log/${log.id}`}>
                  <Card key={log.id} className="p-4 relative">
                    <CardContent>
                      <h2 className="text-lg font-semibold">
                        Log ID: {log.id}
                      </h2>
                      <p className="font-semibold">Action: {log.actionType}</p>
                      <p>Description: {log.description}</p>
                      <p>Dentist: {log.dentistName}</p>
                      <p>Date: {new Date(log.timestamp).toLocaleString()}</p>
                    </CardContent>
                    <div></div>
                    <button
                      onClick={() => {
                        setIndex(index);
                        setIsDeleteOpen(true);
                      }}
                      className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 "
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </Card>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default PatientLogs;
