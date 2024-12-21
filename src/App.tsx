import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/DashboardPage1";
import { useAuth } from "@/hooks/useAuth";
import DataTableDemo from "@/pages/DataTableDemo";
import Dashboard from "@/pages/DashboardPage";
import AdminPage from "@/pages/AdminPage";
import DentistPage from "@/pages/DentistPage";
import PatientPage from "@/pages/PatientPage";
import ReceptionistPage from "@/pages/ReceptionistPage";
import SchedulePage from "@/pages/SchedulePage";
import AppointmentListPage from "@/pages/AppointmentListPage";
import TestPage from "@/pages/Booking/TestPage";
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
  //const { authState, isLording } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        {/* {!isLording && (
          <Route
            path="/"
            element={
              authState ? <Dashboard /> : <Navigate to="/login" replace />
            }
          />
        )} */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DataTableDemo />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dentist" element={<DentistPage />} />
          <Route path="/patient" element={<PatientPage />} />
          <Route path="/receptionist" element={<ReceptionistPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/appointment-list" element={<AppointmentListPage />} />
        </Route>

        <Route path="/booking" element={<DataTableDemo />} />
        <Route path="/test" element={<TestPage />} />
        {/* <Route path="/" element={<DashboardPage />} /> */}

        {/* Error Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
