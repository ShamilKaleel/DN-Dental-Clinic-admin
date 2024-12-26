import { useDentist } from "@/hooks/useDentist";

export default function DentistPage() {
  const { dentistState } = useDentist();
  return (
    <div>
      <h1 className="text-2xl font-bold">Dentist Dashboard</h1>
      <p>Welcome to your dentist dashboard!</p>
      <p>Manage your appointments and patients here.</p>
      <div>
        <h2 className="text-xl font-bold">Dentists</h2>
        <ul>
          {dentistState.dentists.map((dentist) => (
            <li key={dentist.id}>
              <div className="flex flex-col gap-10">
                <span>{dentist.firstName}</span>
                <span>{dentist.specialization}</span>
                <span>{dentist.phoneNumber}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
