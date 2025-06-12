import { useSelector } from "react-redux";
import Table from "../../../../Utils/Table/Table";

const EmpJobTimeLine = () => {
  const { singleEmployee } = useSelector((state) => state.employeeList);

  const columns = [
    {
      name: "Effective Date",
      width: "15%",
      render: (row) => (
        <p className="w-full overflow-hidden">{row?.effectiveDate}</p>
      ),
    },
    {
      name: "Job Title",
      width: "15%",
      render: (row) => (
        <p className="w-full overflow-hidden">{row?.jobTitle}</p>
      ),
    },
    {
      name: "Position Type",
      width: "15%",
      render: (row) => (
        <p className="w-full overflow-hidden">{row?.positionType}</p>
      ),
    },
    {
      name: "Seat No",
      width: "10%",
      render: (row) => <p className="w-full overflow-hidden">{row?.seatNo}</p>,
    },
    {
      name: "Location",
      width: "15%",
      render: (row) => (
        <p className="w-full overflow-hidden">{row?.location}</p>
      ),
    },
    {
      name: "EmployeType",
      width: "15%",
      render: (row) => (
        <p className="w-full overflow-hidden">{row?.employmentType}</p>
      ),
    },
    {
      name: "Shift Time",
      width: "15%",
      render: (row) => (
        <p className="w-full overflow-hidden">
          {row?.shiftTimmings?.startTime}-{row?.shiftTimmings?.endTime}
        </p>
      ),
    },
  ];

  return (
    <div>
      <Table
        data={singleEmployee?.jobTimeline}
        columns={columns}
        isDisplayPagination={false}
      />
    </div>
  );
};

export default EmpJobTimeLine;
