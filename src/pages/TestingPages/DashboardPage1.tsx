import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { authState, login, logout } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Welcome to your admin dashboard!</p>

      <div>
        {authState ? (
          <button onClick={logout}>Logout {authState.username} </button>
        ) : (
          <Button onClick={() => login("username", "password")}>Login</Button>
        )}
      </div>
    </div>
  );
}
