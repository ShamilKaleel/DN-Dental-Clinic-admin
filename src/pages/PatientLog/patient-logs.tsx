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
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
interface PatientLogsProps {
  patientID: string;
}
const PatientLogs: React.FC<PatientLogsProps> = ({ patientID }) => {
  const { logState } = useLog();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(`/patient/${patientID}/log/${id}`);
  };

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

      {logState.logs.length === 0 ? (
        <div className="flex items-center justify-start pl-2">
          <p className="text-gray-500">No logs available.</p>
        </div>
      ) : (
        <div>
          <h1 className="text-xl font-bold pl-1">Logs Books</h1>
          <Carousel className=" md:w-full mt-5 max-w-screen-lg lg:max-w-screen-xl">
            <CarouselContent className="-ml-1">
              {logState.logs.map((log, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <Card key={log.id} className="p-4 relative">
                      <div className="pb-5">
                        <p className="font-semibold">
                          Action: {log.actionType}
                        </p>
                        <p>Dentist: {log.dentistName}</p>
                        <p>Date: {new Date(log.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-5">
                        <Button
                          onClick={() => {
                            setIndex(index);
                            setIsDeleteOpen(true);
                          }}
                          className="w-full justify-start items-center flex text-white rounded-md p-2 transition-all duration-75 bg-red-500 hover:bg-red-600 "
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          <span>Delete</span>
                        </Button>

                        <Button
                          onClick={() => {
                            handleView(log.id);
                          }}
                          className="w-full justify-start items-center flex  rounded-md p-2 transition-all duration-75  "
                        >
                          <SquarePen className="h-4 w-4 mr-2" />
                          <span>View</span>
                        </Button>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default PatientLogs;
