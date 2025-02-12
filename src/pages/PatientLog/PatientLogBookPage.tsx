import PatientLog from "./patient-log-book";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import ScheduleForm from "@/components/forms/schedule-form";
import { useState } from "react";

export default function SchedulePage() {
  const [isOpen, setIsOpen] = useState(false);
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
