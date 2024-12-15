import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col  mx-auto">
      <Outlet />
    </div>
  );
}