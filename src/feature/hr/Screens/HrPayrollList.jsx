import React, { useState } from "react";
import Search from "../../../Utils/Search";
import Select from "../../../Utils/Select";
import HrPayrollamountCard from "../Components/HrPayrollamountCard";
import HrPayrollFilters from "../Components/HrPayrollFilters";
import { useHrPayrollListHook } from "../Hooks/HrPayrollList.Hook";
import StatusWrapper from "../../../Utils/StatusWrapper";
import Table from "../../../Utils/Table/Table";
import { useHrPayrollTableDataHook } from "../Hooks/HrPayrollTableData";
import NoDate from "../../../Utils/NoDate";
import PayrollDetails from "../Components/PayrollDetails";

const HrPayrollList = () => {
  const {
    loading,
    error,
    currentPage,
    totalPages,
    setMonth,
    payroll,
    searchText,
    handlePageClick,
    searchContact,
  } = useHrPayrollListHook();

  const [toggleUi, setToggleUi] = useState("table");
  const [singlePayroll, setSinglePayroll] = useState({});
  const { columns } = useHrPayrollTableDataHook({
    setToggleUi,
    setSinglePayroll,
  });

  return (
    <>
      {toggleUi === "table" && (
        <div className="w-full flex flex-col gap-4">
          <HrPayrollamountCard />
          <HrPayrollFilters
            searchText={searchText}
            searchContact={searchContact}
            setMonth={setMonth}
          />
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
      {toggleUi === "payroll-details" && (
        <PayrollDetails
          setToggleUi={setToggleUi}
          singlePayroll={singlePayroll}
        />
      )}
    </>
  );
};

export default HrPayrollList;
