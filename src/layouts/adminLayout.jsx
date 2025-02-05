import { Navigate, Outlet, useLoaderData } from "react-router";

const AdminLayout = () => {
  const user = useLoaderData();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
