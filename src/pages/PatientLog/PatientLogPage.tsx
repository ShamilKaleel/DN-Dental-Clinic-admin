import { useSchedules } from "@/hooks/useSchedule";
import PatientLog from "./patient-log";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import ScheduleForm from "@/components/forms/schedule-form";
import { useEffect, useState } from "react";
export default function SchedulePage() {
  const { scheduleState, fetchSchedules } = useSchedules();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchData = async () => {
        await fetchSchedules();
      };
      fetchData();
    } catch (error) {
      console.error("Failed to fetch schedules", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {/* Add Schedule Dialog */}
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add Log"
        className="sm:max-w-screen-md p-20"
      >
        <ScheduleForm setIsOpen={setIsOpen} />
      </ResponsiveDialog>

      <div className="pb-5 px-2 lg:px-0">
        <Tabs defaultValue="schedules">
          <TabsList className=" ">
            <TabsTrigger value="schedules">Schedules </TabsTrigger>
            <TabsTrigger value="apoinments">Not ready</TabsTrigger>
          </TabsList>
          <TabsContent value="schedules">
            <PatientLog />
          </TabsContent>
          <TabsContent value="apoinments">
            <div>hi</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
