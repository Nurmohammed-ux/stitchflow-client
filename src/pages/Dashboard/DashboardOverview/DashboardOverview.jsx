import useAuth from "../../../hooks/useAuth";
import UserDashboard from "../DashboardHome/UserDashboard";
import AdminOverview from "../DashboardHome/AdminOverview"
import ManagerOverview from "../DashboardHome/ManagerOverview"

const DashboardOverview = () => {
  const { user } = useAuth();

  if (user?.role === "admin") {
    return <AdminOverview />;
  }

  if (user?.role === "manager") {
    return <ManagerOverview />;
  }

  return <UserDashboard />;
};

export default DashboardOverview;