import { useEmpPayslipScreenHook } from "../Hooks/EmpPayslipScreen.Hook";
import EmpPayslipEmpDetails from "../Components/EmpPayslipEmpDetails";
import Table from "../../../Utils/Table/Table";
import { useEmpPayslipScreenDataHook } from "../Hooks/EmpPayslipScreen.Hook.data";
import HrPayrollFilters from "../../hr/Components/HrPayrollFilters";
import StatusWrapper from "../../../Utils/StatusWrapper";
import NoDate from "../../../Utils/NoDate";
import { useState } from "react";
import PayslipSheet from "../Components/PayslipSheet";

export const EmpPayslipScreen = () => {
  const {
    loading,
    error,
    totalPages,
    currentPage,
    month,
    payroll,
    setMonth,
    handlePageClick,
    setStatus,
    status,
  } = useEmpPayslipScreenHook();
  const [toggleUi, setToggleUi] = useState("table");
  const [singlePayroll, setSinglePayroll] = useState({});

  const { columns } = useEmpPayslipScreenDataHook({
    setToggleUi,
    setSinglePayroll,
  });

  return (
    <>
      {toggleUi === "table" && (
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
            <HrPayrollFilters
              setMonth={setMonth}
              width="w-[35%]"
              isDisplaySeach={false}
              month={month}
              setStatus={setStatus}
              status={status}
            />
          </div>
          <EmpPayslipEmpDetails />
          <StatusWrapper loading={loading} error={error}>
            {payroll?.length ? (
              <Table
                data={payroll}
                columns={columns}
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                totalPages={totalPages}
              />
            ) : (
              <NoDate />
            )}
          </StatusWrapper>
        </div>
      )}
      {toggleUi === "PaySlip" && (
        <PayslipSheet setToggleUi={setToggleUi} singlePayroll={singlePayroll} />
      )}
    </>
  );
};

export default EmpPayslipScreen;
