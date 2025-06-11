import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  Clock,
  FileText,
  ClipboardList,
  Settings,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const EmployeeSidebar = () => {
  return (
    <div className="w-[240px] h-full bg-white flex flex-col gap-6 p-4 items-center border-r">
      <ProfileCard />
      <div className="w-full">
        <SidebarMenu />
      </div>
    </div>
  );
};

export default EmployeeSidebar;

export const ProfileCard = () => {
  return (
    <div className="flex flex-col gap-2 items-center justify-center mb-4">
      <div className="text-xl font-bold text-gray-800">LOGO</div>
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-[100px] h-[100px] rounded-full object-cover border border-gray-400"
      />
      <h3 className="text-lg font-semibold text-gray-900">Vamsi Digamarthi</h3>
      <p className="text-sm text-gray-700">Frontend Developer</p>
    </div>
  );
};

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
        to="/employee-dashboard"
      />

      <CategoryMenu
        label="Management"
        isOpen={openMenu === "management"}
        onToggle={() => toggleMenu("management")}
        items={[
          {
            icon: <Clock size={16} />,
            label: "Time Management",
            to: "/time-management",
          },
          {
            icon: <FileText size={16} />,
            label: "Payslip Management",
            to: "/payslip-management",
          },
          { icon: <ClipboardList size={16} />, label: "Tasks" },
        ]}
      />

      <MenuItem
        icon={<Users size={18} />}
        label="Leaves"
        to="/employee-leaves"
      />

      <CategoryMenu
        label="Configuration"
        isOpen={openMenu === "configuration"}
        onToggle={() => toggleMenu("configuration")}
        items={[
          { icon: <Settings size={16} />, label: "User Config" },
          { icon: <Settings size={16} />, label: "System Config" },
        ]}
      />
    </div>
  );
};

export const MenuItem = ({ icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 p-2 rounded cursor-pointer text-sm ${
        isActive
          ? "bg-orange-200 text-orange-800"
          : "text-gray-800 hover:bg-gray-100"
      }`
    }
  >
    <span>{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export const CategoryMenu = ({ label, isOpen, onToggle, items }) => (
  <div>
    <div
      className="flex justify-between items-center p-2 rounded hover:bg-gray-100 cursor-pointer text-sm text-gray-800"
      onClick={onToggle}
    >
      <span className="flex items-center gap-2">
        <Settings size={18} />
        {label}
      </span>
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
    </div>
    {isOpen && (
      <div className="ml-6 flex flex-col gap-1 mt-1">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            icon={item.icon}
            label={item.label}
            to={item.to}
          />
        ))}
      </div>
    )}
  </div>
);
