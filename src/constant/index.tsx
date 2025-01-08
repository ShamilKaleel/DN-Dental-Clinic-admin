import {
  Home,
  Shield,
  User,
  Settings,
  Calendar,
  ClipboardList,
  Stethoscope,
} from "lucide-react";

const navLinks = [
  {
    title: "Dashboard",
    path: "/",
    icon: <Home size={20} />, // Icon with size
  },
  {
    title: "Admin",
    path: "/admin",
    icon: <Shield size={20} />,
  },
  {
    title: "Dentist",
    path: "/dentist",
    icon: <Stethoscope size={20} />,
  },
  {
    title: "Patient",
    path: "/patient",
    icon: <User size={20} />,
  },
  {
    title: "Receptionist",
    path: "/receptionist",
    icon: <Settings size={20} />,
  },
  {
    title: "Schedule",
    path: "/schedule",
    icon: <Calendar size={20} />,
  },
  {
    title: "Appointment List",
    path: "/appointment-list",
    icon: <ClipboardList size={20} />,
  },
];

const columnHeadersBooking = [
  "Reference Id",
  "Name",
  "NIC",
  "Contact Number",
  "Email",
  "Address",
  "ScheduleId",
  "Status",
  "Date",
  "Day Of Week",
  "Created At",
];

const columnHeadersDoctor = [
  "Id",
  "User Name",
  "Email",
  "Gender",
  "First Name",
  "Specialization",
  "License Number",
  "Phone Number",
  "Nic",
  "Roles",
];



const columnHeadersSchedule = [
  "Id",
  "Date",
  "Day Of Week",
  "Status",
  "Number Of Bookings",
  "Bookings",
  "Start Time",
  "End Time",
  "Duration",
  "Dentist Id",
  "Capacity",
  "Created At",
];
export { navLinks, columnHeadersBooking, columnHeadersDoctor,columnHeadersSchedule };
