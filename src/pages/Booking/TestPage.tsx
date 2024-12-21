import { useBookingContext } from "@/hooks/useBooking";
import { DataTable } from "@/pages/Booking/data-table";
import { columns } from "@/pages/Booking/columns";
export default function BookingPage1() {
  const { bookings, isLoading, error } = useBookingContext();
  return (
    <section className="py-24 px-20">
      <div className=" container">
        <h1 className="text-4xl font-bold">Book a table</h1>
        <DataTable columns={columns} data={bookings} />
      </div>
    </section>
  );
}
