import { useState } from "react";

export const useEmpPayslipScreenHook = () => {
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const monthOptions = [
    { label: "Admin", value: "admin" },
    { label: "Employee", value: "employee" },
    { label: "Manager", value: "manager" },
  ];

  return {
    monthOptions,
    selectedMonth,
    handleMonthChange,
  };
};
