import { Eye } from "lucide-react";

export const useEmpLeavesScreenDataHook = () => {
  const columns = [
    {
      name: "Date Range",
      width: "20%",
      render: (row) => (
        <p>
          {row.startDate} - {row?.endDate}
        </p>
      ),
    },
    {
      name: "Leave Type",
      width: "20%",
      render: (row) => <p>{row.leaveType}</p>,
    },
    {
      name: "Status",
      width: "20%",
      render: (row) => (
        <div
          className={`px-3 py-1 rounded-sm w-fit ${
            row.status === "Pending"
              ? "bg-[#FFF4D2]"
              : row.status === "Approved"
              ? "bg-[#ECFDF5]"
              : "bg-[#FEE2E2]"
          } `}
        >
          <p
            className={`text-base font-semibold ${
              row.status === "Pending"
                ? "text-[#92400E]"
                : row.status === "Approved"
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
      name: "Hr/Manager Notes",
      width: "20%",
      render: (row) => <p>{row.reason?.slice(0, 20)}</p>,
    },
    {
      name: "Document",
      width: "10%",
      render: (row) => <p>{row.document?.slice(0, 10)}</p>,
    },

    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <button>
          <Eye />
        </button>
      ),
    },
  ];

  return {
    columns,
  };
};
