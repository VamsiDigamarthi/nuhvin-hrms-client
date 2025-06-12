import { Download, Eye, X } from "lucide-react";

export const useEmpPayslipScreenDataHook = ({
  setToggleUi,
  setSinglePayroll,
}) => {
  const handlePayroll = (data) => {
    setSinglePayroll(data);
    setToggleUi("PaySlip");
  };

  const columns = [
    {
      name: "Month & Year",
      width: "20%",
      render: (row) => <p>{row.month}</p>,
    },
    {
      name: "Basic Salary",
      width: "20%",
      render: (row) => <p>{row.basicSalary}</p>,
    },
    {
      name: "Deductions",
      width: "20%",
      render: (row) => <p>{row.totalDeductions}</p>,
    },
    {
      name: "Net Salary",
      width: "20%",
      render: (row) => <p>{row.netPay}</p>,
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => (
        <div
          className={`px-3 py-1 rounded-sm w-fit ${
            row.status === "pending"
              ? "bg-[#FFF4D2]"
              : row.status === "approved"
              ? "bg-[#ECFDF5]"
              : "bg-[#FEE2E2]"
          } `}
        >
          <p
            className={`text-base font-semibold ${
              row.status === "pending"
                ? "text-[#92400E]"
                : row.status === "approved"
                ? "text-[#064E3B]"
                : "text-[#DC2626]"
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
        <button
          onClick={() => handlePayroll(row)}
          className="flex gap-1 items-center text-[#000] p-2 rounded-md text-sm"
        >
          <Eye size={20} color="blue" />
        </button>
      ),
    },
  ];

  return {
    columns,
  };
};
