import PatientLogBook from "./patient-log-book";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PatientLogBookPage() {
  return (
    <div className="flex flex-col">
      <div className="pb-5 px-2 lg:px-0">
        <Tabs defaultValue="logbook">
          <TabsList className=" ">
            <TabsTrigger value="logbook">Log Book </TabsTrigger>
            <TabsTrigger value="analysis">Not ready</TabsTrigger>
          </TabsList>
          <TabsContent value="logbook">
            <PatientLogBook />
          </TabsContent>
          <TabsContent value="analysis">
            <div>hi</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
