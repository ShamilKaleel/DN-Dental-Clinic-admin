import { useDentist } from "@/hooks/useDentist";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import ScheduleForm from "@/components/forms/schedule-form";
import DoctorForm from "@/components/forms/docter-form";
import { useEffect, useState } from "react";
export default function DentistPage() {
  const { dentistState, fetchDentists } = useDentist();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    try {
      const fetchData = async () => {
        await fetchDentists();
      };
      fetchData();
    } catch (error) {
      console.error("Failed to fetch dentists", error);
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
        title="Add Schedule"
        className="sm:max-w-screen-md p-20"
      >
        <DoctorForm setIsOpen={setIsOpen} />
      </ResponsiveDialog>

      <div className="pb-5 px-2 lg:px-0">
        <Tabs defaultValue="schedules">
          <TabsList className=" ">
            <TabsTrigger value="schedules">Doctors </TabsTrigger>
            <TabsTrigger value="apoinments">Not ready</TabsTrigger>
          </TabsList>
          <TabsContent value="schedules">
            <div className="flex justify-between py-5">
              <h1 className="text-2xl font-bold pl-1">Doctors List </h1>
              <div className="flex gap-2 md:gap-5">
                <Button className="btn btn-primary bg-muted" variant="ghost">
                  <span className="hidden md:block"> Export CSV </span>
                  <Download className="md:hidden" />
                </Button>
                <Button
                  className="btn btn-primary p-o"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="hidden md:block"> Add Doctors</span>
                  <Plus className="md:hidden" />
                </Button>
              </div>
            </div>

            <DataTable columns={columns} data={dentistState.dentists} />
          </TabsContent>
          <TabsContent value="apoinments">
            <div>hi</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
