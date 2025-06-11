import auth from "../feature/auth/Slices/loginSlice";
import employeeList from "../feature/hr/Slices/HrEmployeeSlice";

const RootReducer = {
  auth,
  employeeList,
};
export default RootReducer;
