import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useBookingContext } from "../hooks/useBooking";

export default function AppointmentListPage() {
  const { bookings, isLoading, error } = useBookingContext();

  if (isLoading) return <p>Loading bookings...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold">Appointment List</h1>
      <p>View all appointments here</p>

      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Invoice</TableHead>
              <TableHead>Status</TableHead>

              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.referenceId}>
                <TableCell className="font-medium">{booking.name}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell className="text-right">
                  {booking.contactNumber}
                </TableCell>
                <TableCell className="text-right">{booking.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
