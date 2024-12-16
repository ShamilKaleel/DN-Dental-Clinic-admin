import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { state, login, logout } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome to your admin dashboard!</p>

      <div>
        {state.isAuthenticated ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button onClick={() => login("username", "password")}>Login</Button>
        )}
      </div>
    </div>
  );
}
