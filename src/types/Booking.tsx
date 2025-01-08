export interface Booking {
  referenceId: string;
  name: string;
  nic: string;
  contactNumber: string;
  email: string;
  address: string;
  scheduleId: string;
  status: "PENDING" | "ACTIVE" | "CANCEL" | "ABSENT" | "FINISHED";
  date: string;
  dayofweek: string;
  createdAt: string;
  scheduleDate: string;
  doctorName: string;
}

export interface CreateBooking {
  name: string;
  nic: string;
  contactNumber: string;
  email: string;
  address: string;
  scheduleId: string;
}
