import { useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs"; // Make sure to install dayjs: npm install dayjs
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const useJobTabScreenHook = () => {
  const { singleEmployee } = useSelector((state) => state.employeeList);

  const empInfo = [
    { left: "Employee Id", right: singleEmployee?.empId || "N/A" },
    {
      left: "Service year",
      right: calculateServiceDuration(
        singleEmployee?.jobTimeline?.[0]?.effectiveDate
      ),
    },
    {
      left: "Joining Date",
      right: singleEmployee?.jobTimeline?.[0]?.effectiveDate
        ? dayjs(singleEmployee?.jobTimeline?.[0]?.effectiveDate).format(
            "YYYY-MM-DD"
          )
        : "N/A",
    },
  ];

  const [empIdDrawer, setEmpIdDrawer] = useState(false);
  const [empTimeLine, setEmpTimeLine] = useState(false);
  const handleEmpidDrawer = () => setEmpIdDrawer(!empIdDrawer);
  const handleTimeLine = () => setEmpTimeLine(!empTimeLine);

  return {
    empInfo,
    empIdDrawer,
    handleEmpidDrawer,
    empTimeLine,
    handleTimeLine,
  };
};

const calculateServiceDuration = (joiningDate) => {
  if (!joiningDate) return "N/A";

  const start = dayjs(joiningDate);
  const now = dayjs();

  const years = now.diff(start, "year");
  const months = now.diff(start.add(years, "year"), "month");

  return `${years} year${years !== 1 ? "s" : ""} ${months} month${
    months !== 1 ? "s" : ""
  }`;
};
