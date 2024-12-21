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

export { navLinks };
