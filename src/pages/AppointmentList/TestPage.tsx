import { useBooking } from "@/hooks/useBooking";
import { DataTable } from "@/pages/AppointmentList/data-table";
import { columns } from "@/pages/AppointmentList/columns";
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
    <section className="flex flex-col   ">
      <div className="px-2 md:5 lg:px-10">
        <h1 className="text-4xl font-bold">Book a table</h1>
        <DataTable columns={columns} data={state.bookings} />
      </div>
    </section>
  );
}
