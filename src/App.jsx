import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./feature/auth/Screens/LoginScreen";
import HrDashboard from "./feature/hr/Screens/HrDashboard";
import { ProtectedRoute } from "./Layout/ProtectedRoute";
import EmployeeLayout from "./Layout/EmployeeLayout";
import EmployeeDashboardScreen from "./feature/employee/Screens/EmployeeDashboardScreen";
import EmpPayslipScreen from "./feature/employee/Screens/EmpPayslipScreen";
import EmpLeavesScreen from "./feature/employee/Screens/EmpLeavesScreen";
import LeavesManagementScreen from "./feature/hr/Screens/LeavesManagementScreen";
import HrLayout from "./Layout/HrLayout";
import HrEmployeeManagentScreen from "./feature/hr/Screens/HrEmployeeManagentScreen";

import HrPayrollList from "./feature/hr/Screens/HrPayrollList";

import SignupScreen from "./feature/auth/Screens/SignupScreen";


function App() {
  return (
    <div className="flex flex-col w-full  overflow-hidden">
      <ToastContainer
        position="top-right"
        autoClose={5000} // 5 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/signup/:empId/:email/:designation"
          element={<SignupScreen />}
        />
        <Route element={<ProtectedRoute allowedRoles={["Hr"]} />}>
          <Route element={<HrLayout />}>
            <Route path="/hr-dashboard" element={<HrDashboard />} />
            <Route
              path="/hr-leave-management"
              element={<LeavesManagementScreen />}
            />
            <Route
              path="/employees-details"
              element={<HrEmployeeManagentScreen />}
            />
            <Route path="/hr-payroll-management" element={<HrPayrollList />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["Employee"]} />}>
          <Route element={<EmployeeLayout />}>
            <Route
              path="/employee-dashboard"
              element={<EmployeeDashboardScreen />}
            />
            <Route path="/payslip-management" element={<EmpPayslipScreen />} />
            <Route path="/employee-leaves" element={<EmpLeavesScreen />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
