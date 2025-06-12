import React, { useState } from "react";
import EmployeeProfileDetails from "../../../Utils/EmployeeProfileDetails";
import TabComponent from "../Components/TabComponent";
import GeneralDetailsScreen from "../TabScreens/Screens/GeneralDetailsScreen";
import JobTabScreen from "../TabScreens/Screens/JobTabScreen";
import PayrollScreen from "../TabScreens/Screens/PayrollScreen";

const HrEmployeeDetailsViewScreen = ({ employee, setToggleUi }) => {
  const [tab, setTab] = useState("General");

  const handleTab = (tabName) => setTab(tabName);

  return (
    <div className="flex w-full gap-4">
      <EmployeeProfileDetails setToggleUi={setToggleUi} />
      <div className="w-[75%] p-6 rounded-md flex flex-col gap-4 bg-white">
        <TabComponent handleTab={handleTab} tab={tab} />
        <div className="mt-1">
          {tab === "General" ? (
            <GeneralDetailsScreen />
          ) : tab === "Job" ? (
            <JobTabScreen />
          ) : tab === "Payroll" ? (
            <PayrollScreen />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default HrEmployeeDetailsViewScreen;
