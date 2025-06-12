import React from "react";
import BorderEditIconCard from "../../../../Utils/BorderEditIconCard";
import { useJobTabScreenHook } from "../Hooks/JobTabScreenHook";
import { SingleColumnDetails } from "./GeneralDetailsScreen";
import Drawer from "../../../../Utils/Drawer";
import EmpServiceYearEdit from "../Components/EmpServiceYearEdit";
import EmpJobTimeLine from "../Components/EmpJobTimeLine";
import EmpJobTimeLineEdit from "../Components/EmpJobTimeLineEdit";

const JobTabScreen = () => {
  const {
    empInfo,
    empIdDrawer,
    handleEmpidDrawer,
    empTimeLine,
    handleTimeLine,
  } = useJobTabScreenHook();
  return (
    <>
      <div className="flex flex-col gap-4">
        <BorderEditIconCard
          lable="Employment Information"
          onClick={handleEmpidDrawer}
        >
          <SingleColumnDetails data={empInfo} />
        </BorderEditIconCard>
        <BorderEditIconCard lable="Job Timeline" onClick={handleTimeLine}>
          <EmpJobTimeLine />
        </BorderEditIconCard>
      </div>
      <Drawer
        isOpen={empIdDrawer}
        onClose={handleEmpidDrawer}
        anotherStyles="w-[30%]"
      >
        <EmpServiceYearEdit handleEditServiceYear={handleEmpidDrawer} />
      </Drawer>
      <Drawer
        isOpen={empTimeLine}
        onClose={handleTimeLine}
        anotherStyles="w-[30%]"
      >
        <EmpJobTimeLineEdit handleEditTimeline={handleTimeLine} />
      </Drawer>
    </>
  );
};

export default JobTabScreen;
