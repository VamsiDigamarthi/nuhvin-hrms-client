import { useEffect, useState } from "react";
import { getPayrollApi } from "../Services/emp-payroll";

export const useEmpPayslipScreenHook = () => {
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");

  const [payroll, setPayroll] = useState([]);

  const fetchPayroll = async ({ page = 1 }) => {
    setLoading(true);
    const data = await getPayrollApi({
      month,
      page,
      token,
      limit: 10,
      status: status === "all" ? "" : status,
    });

    if (data?.status) {
      setPayroll(data?.res?.payrolls);
      setTotalPages(data?.res?.totalPages);
    } else {
      setError(data?.errMsg);
    }

    setLoading(false);
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
    fetchPayroll({ page: event.selected + 1 });
  };

  useEffect(() => {
    fetchPayroll({ page: currentPage + 1 });
  }, [currentPage, month, status]);

  return {
    loading,
    error,
    totalPages,
    currentPage,
    month,
    payroll,
    setMonth,
    handlePageClick,
    setStatus,
    status,
  };
};
