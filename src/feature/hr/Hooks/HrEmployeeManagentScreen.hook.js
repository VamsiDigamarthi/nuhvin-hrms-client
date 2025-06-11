import { useEffect, useState } from "react";
import { getEmployees } from "../Services/hr-employees-management";

export const useHrEmployeeManagentScreenHook = () => {
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const fetchEmployees = async ({ page = 1 }) => {
    setIsLoading(true);
    const data = await getEmployees({
      department,
      limit: 10,
      page,
      search: searchText,
      status,
      token,
    });
    if (data?.status) {
      setEmployees(data?.apiRes?.employees);
      setTotalPages(data?.apiRes?.totalPages);
    } else {
      setError(data?.errMsg);
    }
    setIsLoading(false);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  const searchEmployee = (text) => {
    setSearchText(text);
    setCurrentPage(0);
  };
  const handleSetDepartment = (value) => setDepartment(value);
  const handleSetStatus = (value) => setStatus(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500); // debounce delay

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    fetchEmployees({ page: currentPage + 1, search: debouncedSearchText });
  }, [debouncedSearchText, currentPage, status, department]);

  return {
    isLoading,
    error,
    employees,
    totalPages,
    currentPage,
    status,
    department,
    searchText,
    handlePageClick,
    searchEmployee,
    handleSetDepartment,
    handleSetStatus,
  };
};
