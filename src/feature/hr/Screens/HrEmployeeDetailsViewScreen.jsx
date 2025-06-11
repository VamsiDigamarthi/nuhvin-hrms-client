import React, { useState } from "react";
import EmployeeProfileDetails from "../../../Utils/EmployeeProfileDetails";
import TabComponent from "../Components/TabComponent";
import GeneralDetailsScreen from "../TabScreens/GeneralDetailsScreen";
import JobTabScreen from "../TabScreens/JobTabScreen";

const HrEmployeeDetailsViewScreen = ({ employee, setToggleUi }) => {
  const [tab, setTab] = useState("General");

  const handleTab = (tabName) => setTab(tabName);

  return (
    <div className="flex w-full gap-4">
      <EmployeeProfileDetails setToggleUi={setToggleUi} user={employee} />
      <div className="w-[75%] p-6 rounded-md flex flex-col gap-4 bg-white">
        <TabComponent handleTab={handleTab} tab={tab} />
        <div className="mt-1">
          {tab === "General" ? (
            <GeneralDetailsScreen employee={employee} />
          ) : (
            <JobTabScreen />
          )}
        </div>
      </div>
    </div>
  );
};

export default HrEmployeeDetailsViewScreen;
