import UserDashboard from "../DashboardHome/UserDashboard";
import AdminOverview from "../DashboardHome/AdminOverview";
import ManagerOverview from "../DashboardHome/ManagerOverview";
import useRole from "../../../hooks/useRole";

const DashboardOverview = () => {
  const { role } = useRole();

  if (role === "admin") {
    return <AdminOverview />;
  }

  if (role === "manager") {
    return <ManagerOverview />;
  }

  return <UserDashboard />;
};

export default DashboardOverview;
