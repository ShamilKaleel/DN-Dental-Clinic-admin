import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import Chart from "./chart";

// Define types for schedules
interface UpcomingSchedule {
  date: string;
  startTime: string;
  endTime: string;
  appointmentCount: number;
}

interface CancelledSchedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface BookingStats {
  finishedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
  totalBookings: number;
  month: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<BookingStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [schedules, setSchedules] = useState<UpcomingSchedule[]>([]);
  const [scheduleLoading, setScheduleLoading] = useState<boolean>(true);
  const [cancelledSchedules, setCancelledSchedules] = useState<
    CancelledSchedule[]
  >([]);
  const [cancelledLoading, setCancelledLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch booking stats
    axios
      .get<BookingStats>(
        "http://localhost:8080/api/bookings/currentMonth/stats"
      )
      .then((response) => setStats(response.data))
      .catch((error) => console.error("Error fetching booking stats:", error))
      .finally(() => setLoading(false));

    // Fetch upcoming schedules
    axios
      .get<UpcomingSchedule[]>(
        "http://localhost:8080/api/schedules/upcomingSchedules"
      )
      .then((response) => setSchedules(response.data))
      .catch((error) =>
        console.error("Error fetching upcoming schedules:", error)
      )
      .finally(() => setScheduleLoading(false));

    // Fetch cancelled schedules
    axios
      .get<CancelledSchedule[]>(
        "http://localhost:8080/api/schedules/cancelledSchedules"
      )
      .then((response) => setCancelledSchedules(response.data))
      .catch((error) =>
        console.error("Error fetching cancelled schedules:", error)
      )
      .finally(() => setCancelledLoading(false));
  }, []);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-28 w-full rounded-lg" />
          ))
        ) : (
          <>
            <Card className="rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium">Finished Bookings</h2>
              <p className="text-2xl">{stats?.finishedBookings}</p>
              <span className="text-sm text-gray-500">{stats?.month}</span>
            </Card>
            <Card className="rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium">Cancelled Bookings</h2>
              <p className="text-2xl">{stats?.cancelledBookings}</p>
              <span className="text-sm text-gray-500">{stats?.month}</span>
            </Card>
            <Card className="rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium">Pending Bookings</h2>
              <p className="text-2xl">{stats?.pendingBookings}</p>
              <span className="text-sm text-gray-500">{stats?.month}</span>
            </Card>
            <Card className="rounded-lg p-6 text-center">
              <h2 className="text-lg font-medium">Total Bookings</h2>
              <p className="text-2xl">{stats?.totalBookings}</p>
              <span className="text-sm text-gray-500">{stats?.month}</span>
            </Card>
          </>
        )}
      </div>

      <section className="mt-6 rounded-lg">{!loading && <Chart />}</section>

      <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Schedules Table */}
        {scheduleLoading ? (
          <Skeleton className="h-64 w-full rounded-lg" />
        ) : (
          <Card className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Upcoming Schedules
            </h2>
            {schedules.length > 0 ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Time</th>
                    <th className="text-left py-2 px-4">Appointments</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4">{schedule.date}</td>
                      <td className="py-2 px-4">
                        {schedule.startTime} - {schedule.endTime}
                      </td>
                      <td className="py-2 px-4">{schedule.appointmentCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-sm">No upcoming schedules.</p>
            )}
          </Card>
        )}

        {/* Cancelled Schedules Table */}
        {cancelledLoading ? (
          <Skeleton className="h-64 w-full rounded-lg" />
        ) : (
          <Card className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Cancelled Schedules
            </h2>
            {cancelledSchedules.length > 0 ? (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4">Date</th>
                    <th className="text-left py-2 px-4">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {cancelledSchedules.map((schedule, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 px-4">{schedule.date}</td>
                      <td className="py-2 px-4">
                        {schedule.startTime} - {schedule.endTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 text-sm">No cancelled schedules.</p>
            )}
          </Card>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
