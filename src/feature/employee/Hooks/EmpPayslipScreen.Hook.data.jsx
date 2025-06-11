import { X } from "lucide-react";

export const useEmpPayslipScreenDataHook = () => {
  const columns = [
    {
      name: "Month & Year",
      width: "20%",
      render: (row) => <p>{row.id}</p>,
    },
    {
      name: "Basic Salary",
      width: "20%",
      render: (row) => <p>{row.firstName}</p>,
    },
    {
      name: "Deductions",
      width: "20%",
      render: (row) => <p>{row.email}</p>,
    },
    {
      name: "Net Salary",
      width: "20%",
      render: (row) => <p>{row.mobile}</p>,
    },
    {
      name: "Status",
      width: "10%",
      render: (row) => <p>{row.date?.slice(0, 10)}</p>,
    },

    {
      name: "Action",
      width: "10%",
      render: (row) => (
        <button
          onClick={() => deletContact(row?._id)}
          className="flex gap-1 items-center bg-[#FEE2E2] text-[#DC2626] p-2 rounded-md"
        >
          <X />
          Delete
        </button>
      ),
    },
  ];

  return {
    columns,
  };
};
