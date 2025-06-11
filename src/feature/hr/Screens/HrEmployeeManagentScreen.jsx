import { useState } from "react";
import NoDate from "../../../Utils/NoDate";
import StatusWrapper from "../../../Utils/StatusWrapper";
import Table from "../../../Utils/Table/Table";
import HrEmployeesFilterCard from "../Components/HrEmployeesFilterCard";
import HrEmployeesManaFirstCard from "../Components/HrEmployeesManaFirstCard";
import { useHrEmployeeManagentScreenDataHook } from "../Hooks/HrEmployeeManagentScreen.Data.Hook";
import { useHrEmployeeManagentScreenHook } from "../Hooks/HrEmployeeManagentScreen.hook";
import HrEmployeeDetailsViewScreen from "./HrEmployeeDetailsViewScreen";

const HrEmployeeManagentScreen = () => {
  const {
    isLoading,
    error,
    employees,
    totalPages,
    currentPage,
    status,
    department,
    searchText,
    handlePageClick,
    searchEmployee,
    handleSetDepartment,
    handleSetStatus,
  } = useHrEmployeeManagentScreenHook();

  const [toggleUi, setToggleUi] = useState(true);
  const [singleEmployee, setSingEmployee] = useState(null);

  const { columns } = useHrEmployeeManagentScreenDataHook({
    setSingEmployee,
    setToggleUi,
  });

  return (
    <>
      {toggleUi ? (
        <div className="bg-white rounded-md shadow-custom p-4 flex flex-col gap-4">
          <HrEmployeesManaFirstCard />
          <HrEmployeesFilterCard
            status={status}
            department={department}
            searchText={searchText}
            searchEmployee={searchEmployee}
            handleSetDepartment={handleSetDepartment}
            handleSetStatus={handleSetStatus}
          />
          <StatusWrapper loading={isLoading} error={error}>
            {employees?.length ? (
              <Table
                data={employees}
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
      ) : (
        <HrEmployeeDetailsViewScreen
          setToggleUi={setToggleUi}
          employee={singleEmployee}
        />
      )}
    </>
  );
};

export default HrEmployeeManagentScreen;
