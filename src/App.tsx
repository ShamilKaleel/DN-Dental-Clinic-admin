import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import NotFoundPage from "@/pages/NotFoundPage";
import DashboardPage from "@/pages/DashboardPage";
import { useAuth } from "@/hooks/useAuth";
import DataTableDemo from "@/pages/DataTableDemo";
import Dashboard from "@/pages/Dashboard";
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    console.log("ProtectedRoute: User is not authenticated");
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const { state } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            state.isAuthenticated ? (
              <DashboardPage />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route path="/booking" element={<DataTableDemo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" element={<DashboardPage />} /> */}

        {/* Error Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
