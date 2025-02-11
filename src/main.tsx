import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/authContext.tsx";
import { BookingProvider } from "./contexts/bookingContext.tsx";
import { DentistProvider } from "./contexts/dentistContext.tsx";
import { ScheduleProvider } from "./contexts/scheduleContext.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { PatientProvider } from "./contexts/patientContext.tsx";
import { PatientLogProvider } from "./contexts/patientLogContext";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <DentistProvider>
        <ThemeProvider>
          <ScheduleProvider>
            <BookingProvider>
              <PatientProvider>
                <PatientLogProvider>
                  <App />
                </PatientLogProvider>
              </PatientProvider>
            </BookingProvider>
          </ScheduleProvider>
        </ThemeProvider>
      </DentistProvider>
    </AuthProvider>
  </StrictMode>
);
