import ProtectedRoute from "./components/protectedRouts";
import "./styles/dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProtectedRoute>
          {children}
        </ProtectedRoute>
      </body>
    </html>
  );
}
