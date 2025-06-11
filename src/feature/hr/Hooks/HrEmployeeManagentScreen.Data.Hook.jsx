import { Eye } from "lucide-react";

export const useHrEmployeeManagentScreenDataHook = ({
  setSingEmployee,
  setToggleUi,
}) => {
  const handleSelectEmp = (emp) => {
    setToggleUi(false);
    setSingEmployee(emp);
  };

  const columns = [
    {
      name: "Employee Name",
      width: "20%",
      render: (row) => (
        <div className="w-full flex items-center gap-1">
          <span className="w-[45px] h-[45px] rounded-full bg-gray-500"></span>
          <div className="w-[80%] flex ">
            <span className="text-base font-sans font-semibold">
              {row?.name}
            </span>
            <span>{row?.email}</span>
          </div>
        </div>
      ),
    },
    {
      name: "Employee ID",
      width: "10%",
      render: (row) => <p>{row.empId}</p>,
    },
    {
      name: "Job Title",
      width: "20%",
      render: (row) => <p>{row?.jobTitle ?? "-"}</p>,
    },
    {
      name: "Department",
      width: "20%",
      render: (row) => <p>{row?.department ?? "-"}</p>,
    },
    {
      name: "Shift Timings",
      width: "10%",
      render: (row) => (
        <p>
          {row.shiftTimmings?.startTime} - {row.shiftTimmings?.endTime}
        </p>
      ),
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => (
        <div
          className={`px-3 py-1 rounded-sm w-fit ${
            row.status === "inactive" ? "bg-[#FFF4D2]" : "bg-[#ECFDF5]"
          } `}
        >
          <p
            className={`text-base font-semibold ${
              row.status === "inactive" ? "text-[#92400E]" : "text-[#064E3B]"
            }`}
          >
            {row?.status}
          </p>
        </div>
      ),
    },
    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <button onClick={() => handleSelectEmp(row)}>
          <Eye />
        </button>
      ),
    },
  ];

  return { columns };
};
