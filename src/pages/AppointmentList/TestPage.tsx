import { useBooking } from "@/hooks/useBooking";
import { DataTable } from "@/pages/AppointmentList/data-table";
import { columns } from "@/pages/AppointmentList/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
export default function BookingPage() {
  const { state } = useBooking();

  if (!state)
    return (
      <div>
        <h1 className="text-2xl font-bold">Appointment List</h1>
        <p>View all appointments here</p>
        <p>no............</p>
      </div>
    );
  return (
    <div className="flex flex-col">
      <div className="pb-5 px-2 md:5 lg:px-10">
        <Tabs defaultValue="apoinments">
          <TabsList className=" ">
            <TabsTrigger value="schedules">Schedules </TabsTrigger>
            <TabsTrigger value="apoinments">All Apoinments</TabsTrigger>
          </TabsList>
          <TabsContent value="schedules">
            <div>hi</div>
          </TabsContent>
          <TabsContent value="apoinments">
            <div className="flex justify-between py-5">
              <h1 className="text-2xl font-bold pl-1">Appointment List </h1>
              <div className="flex gap-2 md:gap-5">
                <Button className="btn btn-primary bg-muted" variant="ghost">
                  <span className="hidden md:block"> Export CSV</span>
                  <Download className="md:hidden" />
                </Button>
                <Button className="btn btn-primary p-o">
                  <span className="hidden md:block"> Add Appointment</span>
                  <Plus className="md:hidden" />
                </Button>
              </div>
            </div>

            <DataTable columns={columns} data={state.bookings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
