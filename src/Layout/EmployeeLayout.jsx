import React from "react";
import EmployeeSibebar from "./EmployeeSibebar";
import { Outlet } from "react-router-dom";

const EmployeeLayout = () => {
  return (
    <div className="w-full h-full flex">
      <EmployeeSibebar />
      <div className="w-[calc(100%-240px)] h-full flex flex-col">
        <div className="w-full h-[70px] bg-blue-300"></div>
        <main className="w-full h-[calc(100%-70px)] bg-[#F8F8F8] p-4 overflow-y-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EmployeeLayout;
