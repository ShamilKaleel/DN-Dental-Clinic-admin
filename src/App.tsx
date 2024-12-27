import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/Auth/LoginPage";
import SignupPage from "@/pages/Auth/SignupPage";
import NotFoundPage from "@/pages/Auth/NotFoundPage";
import { useAuth } from "@/hooks/useAuth";
import DataTableDemo from "@/pages/TestingPages/DataTableDemo";
import Dashboard from "@/pages/Dashboard/DashboardPage";
import AdminPage from "@/pages/Admin/AdminPage";
import DentistPage from "@/pages/Dentist/DentistPage";
import PatientPage from "@/pages/Patient/PatientPage";
import ReceptionistPage from "@/pages/Receptionist/ReceptionistPage";
import SchedulePage from "@/pages/Schedule/SchedulePage";
import AppointmentListPage from "@/pages/AppointmentList/TestPage";
import { Divide } from "lucide-react";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { authState, isLording } = useAuth();

  if (!authState && !isLording) {
    console.log("ProtectedRoute: User is not authenticated");
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { authState } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={!authState ? <LoginPage /> : <Navigate to="/" replace />}
        />
        {/* Signup Not working*/}
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<div>hi</div>} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dentist" element={<DentistPage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/receptionist" element={<ReceptionistPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/appointment-list" element={<AppointmentListPage />} />
        </Route>

        {/* Public Routes only for testiong */}
        <Route path="/booking" element={<DataTableDemo />} />
        <Route path="/test" element={<AppointmentListPage />} />

        {/* Error Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
