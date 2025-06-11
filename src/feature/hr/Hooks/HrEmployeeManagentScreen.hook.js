import { useEffect, useState } from "react";
import { getEmployees } from "../Services/hr-employees-management";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployees,
  setCurrentPage,
  setSearchText,
} from "../Slices/HrEmployeeSlice";

export const useHrEmployeeManagentScreenHook = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const {
    employees,
    totalPages,
    currentPage,
    searchText,
    department,
    status,
    isLoading,
    error,
  } = useSelector((state) => state.employeeList);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchEmployees({
          page: currentPage + 1,
          search: searchText,
          department,
          status,
          token,
        })
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText, department, status, currentPage, dispatch]);

  const handlePageClick = (event) => {
    dispatch(setCurrentPage(event.selected));
  };

  //   const handleSearch = (text) => {
  //   dispatch(setSearchText(text));
  // };

  return { handlePageClick };
};
