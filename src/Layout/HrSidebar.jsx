import { useState } from "react";
import { MenuItem, ProfileCard } from "./EmployeeSibebar";
import { LayoutDashboard, Leaf, User } from "lucide-react";

const HrSidebar = () => {
  return (
    <div className="w-[240px] h-full bg-white flex flex-col gap-6 p-4 items-center border-r">
      <ProfileCard />
      <div className="w-full">
        <SidebarMenu />
      </div>
    </div>
  );
};

export default HrSidebar;

const SidebarMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };
  return (
    <div className="flex flex-col gap-2">
      <MenuItem
        icon={<LayoutDashboard size={18} />}
        label="Dashboard"
        to="/hr-dashboard"
      />
      <MenuItem
        icon={<User size={18} />}
        label="Employee"
        to="/employees-details"
      />
      <MenuItem
        icon={<Leaf size={18} />}
        label="Leavs"
        to="/hr-leave-management"
      />
      <MenuItem
        icon={<Leaf size={18} />}
        label="Payroll Management"
        to="/hr-payroll-management"
      />
    </div>
  );
};
