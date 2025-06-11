import { useState } from "react";
import NoDate from "../../../Utils/NoDate";
import StatusWrapper from "../../../Utils/StatusWrapper";
import Table from "../../../Utils/Table/Table";
import HrEmployeesFilterCard from "../Components/HrEmployeesFilterCard";
import HrEmployeesManaFirstCard from "../Components/HrEmployeesManaFirstCard";
import { useHrEmployeeManagentScreenDataHook } from "../Hooks/HrEmployeeManagentScreen.Data.Hook";
import { useHrEmployeeManagentScreenHook } from "../Hooks/HrEmployeeManagentScreen.hook";
import HrEmployeeDetailsViewScreen from "./HrEmployeeDetailsViewScreen";
import { useSelector } from "react-redux";

const HrEmployeeManagentScreen = () => {
  const { employees, totalPages, currentPage, isLoading, error } = useSelector(
    (state) => state.employeeList
  );

  const { handlePageClick } = useHrEmployeeManagentScreenHook();

  const [toggleUi, setToggleUi] = useState(true);

  const { columns } = useHrEmployeeManagentScreenDataHook({
    setToggleUi,
  });

  return (
    <>
      {toggleUi ? (
        <div className="bg-white rounded-md shadow-custom p-4 flex flex-col gap-4">
          <HrEmployeesManaFirstCard />
          <HrEmployeesFilterCard />
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
        <HrEmployeeDetailsViewScreen setToggleUi={setToggleUi} />
      )}
    </>
  );
};

export default HrEmployeeManagentScreen;
