import React from "react";

const EmpPayslipEmpDetails = () => {
  return (
    <div className="w-full flex flex-wrap gap-4">
      <EmpDetails lable="Employee Name" value="Vamsi Digamarthi" />
      <EmpDetails lable="Designation" value="Fullstack Developer" />
      <EmpDetails lable="Employee ID" value="EMP2025" />
      <EmpDetails lable="Department" value="Engineering" />
      <EmpDetails lable="Bank Account" value="XXXX-4589" />
    </div>
  );
};

export default EmpPayslipEmpDetails;

const EmpDetails = ({ lable, value }) => {
  return (
    <div className="w-[30%] flex flex-col gap-0">
      <p className="text-[10px] font-sans font-medium text-[#6B7280]">
        {lable}
      </p>
      <p className="w-full font-sans font-semibold text-black text-[14px]">
        {value}
      </p>
    </div>
  );
};
