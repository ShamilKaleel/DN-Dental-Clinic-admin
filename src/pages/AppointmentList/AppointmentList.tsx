import { useBooking } from "@/hooks/useBooking";
import { DataTable } from "@/pages/AppointmentList/data-table";
import { columns } from "@/pages/AppointmentList/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
      <div className="pb-5 px-2 lg:px-0">
        <Tabs defaultValue="apoinments">
          <TabsList className=" ">
            <TabsTrigger value="schedules">Schedules </TabsTrigger>
            <TabsTrigger value="apoinments">All Apoinments</TabsTrigger>
          </TabsList>
          <TabsContent value="schedules">
            <div>hi</div>
          </TabsContent>
          <TabsContent value="apoinments">
            <DataTable columns={columns} data={state.bookings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
