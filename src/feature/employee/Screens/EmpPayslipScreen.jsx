import React from "react";
import { useEmpPayslipScreenHook } from "../Hooks/EmpPayslipScreen.Hook";
import Select from "../../../Utils/Select";
import IconButton from "../../../Utils/IconButon";
import { Download, Plus, Trash2 } from "lucide-react";
import EmpPayslipEmpDetails from "../Components/EmpPayslipEmpDetails";
import Table from "../../../Utils/Table/Table";
import { useEmpPayslipScreenDataHook } from "../Hooks/EmpPayslipScreen.Hook.data";

export const EmpPayslipScreen = () => {
  const { monthOptions, selectedMonth, handleMonthChange } =
    useEmpPayslipScreenHook();

  const { columns } = useEmpPayslipScreenDataHook();

  return (
    <div className="w-full shadown-custom rounded-md p-6 bg-white flex flex-col gap-4">
      <div className="w-full flex justify-between items-center">
        <div>
          <h2 className="text-lg font-sans font-semibold">
            Pay Slip Management
          </h2>
          <span className="text-sm font-sans font-normal text-gray-400">
            Last 3 Months
          </span>
        </div>
        <div className="flex gap-4 items-center-">
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            options={monthOptions}
            firstOption={"Month"}
            width="w-[250px]"
          />
          <IconButton
            icon={<Download size={16} />}
            text="Download PDF"
            // onClick={handleClick}
          />
        </div>
      </div>
      <EmpPayslipEmpDetails />
      <Table columns={columns} />
    </div>
  );
};

export default EmpPayslipScreen;
