import { useSchedules } from "@/hooks/useSchedule";

export default function SchedulePage() {
  const { state } = useSchedules();

  if (!state) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Schedule</h1>
      <p>View your schedule here</p>
      {state.schedules.map((schedule) => (
        <div key={schedule.id}>
          <h2>{schedule.status}</h2>
          <p>{schedule.dentistId}</p>
          <div>
            <h3>Time</h3>
            <p>{schedule.startTime}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
