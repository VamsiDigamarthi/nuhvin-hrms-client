import React, { useState } from "react";
import HrLeavesCardCount from "../Components/HrLeavesCardCount";
import HrLeavesFilter from "../Components/HrLeavesFilter";
import Table from "../../../Utils/Table/Table";
import { useLeavesManagementScreenDataHook } from "../Hooks/HrLeavesManagementScreen.Hook.Data";
import { useLeavesManagementHook } from "../Hooks/HrLeavesManagementScreen.hook";
import StatusWrapper from "../../../Utils/StatusWrapper";
import NoDate from "../../../Utils/NoDate";
import EmployeeProfileDetails from "../../../Utils/EmployeeProfileDetails";
import HrLeaveDetailsDescribe from "../Components/HrLeaveDetailsDescribe";

const LeavesManagementScreen = () => {
  const {
    leaves,
    loading,
    error,
    totalPages,
    currentPage,
    handlePageClick,
    setStatus,
    setLeaveType,
    status,
    leaveType,
    fetchLeaves,
  } = useLeavesManagementHook();

  const [toggleUi, setToggleUi] = useState(true);
  const [singleLeave, setSingleLeve] = useState(null);

  const { columns } = useLeavesManagementScreenDataHook({
    setSingleLeve,
    setToggleUi,
  });
  return (
    <div className="w-full flex flex-col gap-4">
      {toggleUi ? (
        <>
          <HrLeavesCardCount />
          <div className="bg-white rounded-md shadow-custom p-4 flex flex-col gap-4">
            <HrLeavesFilter
              status={status}
              leaveType={leaveType}
              setLeaveType={setLeaveType}
              setStatus={setStatus}
            />
            <StatusWrapper loading={loading} error={error}>
              {leaves?.length ? (
                <Table
                  data={leaves}
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
        </>
      ) : (
        <>
          <div className="flex w-full gap-4">
            <EmployeeProfileDetails
              setToggleUi={setToggleUi}
              user={singleLeave?.user}
            />
            <HrLeaveDetailsDescribe
              setToggleUi={setToggleUi}
              fetchLeaves={fetchLeaves}
              singleLeave={singleLeave}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default LeavesManagementScreen;
