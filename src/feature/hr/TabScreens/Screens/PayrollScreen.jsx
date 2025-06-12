import React, { useState } from "react";
import IconButton from "../../../../Utils/IconButon";
import { Ticket, X } from "lucide-react";
import { useSelector } from "react-redux";
import { payrollCreateApi } from "../Services/payroll.service";

const PayrollScreen = () => {
  const { singleEmployee } = useSelector((state) => state.employeeList);
  const token = localStorage.getItem("token");

  const [earnings, setEarnings] = useState({
    basicSalary: 0,
    houseRentAllowance: 0,
    conveyanceAllowance: 0,
    specialAllowance: 0,
    advanceStatutoryBonus: 0,
  });

  const [deductions, setDeductions] = useState({
    professionTax: 0,
    providentFundEmployeeContribution: 0,
    tds: 0,
  });

  const [status, setStatus] = useState("pending");

  const handleChange = (section, field, value) => {
    const val = Number(value) || 0;
    if (section === "earnings") {
      setEarnings((prev) => ({ ...prev, [field]: val }));
    } else {
      setDeductions((prev) => ({ ...prev, [field]: val }));
    }
  };

  const totalEarnings = Object.values(earnings).reduce(
    (acc, val) => acc + val,
    0
  );
  const totalDeductions = Object.values(deductions).reduce(
    (acc, val) => acc + val,
    0
  );
  const netPay = totalEarnings - totalDeductions;

  const handleSubmit = async () => {
    const payload = {
      ...earnings,
      ...deductions,
      totalEarnings,
      totalDeductions,
      netPay,
      month: new Date().toISOString().slice(0, 7),
      status,
      user: singleEmployee?._id,
    };
    const data = await payrollCreateApi({ payroll: payload, token });
    // dispatch(createPayroll(payload)) or send to API
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Earnings & Deductions */}
      <div className="flex justify-between gap-4">
        <EditSalaryCard
          title="Earnings"
          section="earnings"
          fields={[
            { label: "Basic Salary", name: "basicSalary" },
            { label: "House Rent Allowance", name: "houseRentAllowance" },
            { label: "Conveyance Allowance", name: "conveyanceAllowance" },
            { label: "Special Allowance", name: "specialAllowance" },
            { label: "Advance Statutory Bonus", name: "advanceStatutoryBonus" },
          ]}
          values={earnings}
          onChange={handleChange}
          total={totalEarnings}
        />

        <EditSalaryCard
          title="Deductions"
          section="deductions"
          fields={[
            { label: "Profession Tax", name: "professionTax" },
            {
              label: "Provident Fund (Employee)",
              name: "providentFundEmployeeContribution",
            },
            { label: "TDS", name: "tds" },
          ]}
          values={deductions}
          onChange={handleChange}
          total={totalDeductions}
        />
      </div>

      {/* Summary & Actions */}
      <div className="flex justify-between gap-4">
        <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="text-sm">
            Total Earnings: ₹ {totalEarnings.toLocaleString()}
          </div>
          <div className="text-sm">
            Total Deductions: ₹ {totalDeductions.toLocaleString()}
          </div>
          <div className="text-sm font-bold">
            Net Pay: ₹ {netPay.toLocaleString()}
          </div>
        </div>

        <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm flex flex-col gap-4 justify-between">
          <h3 className="text-lg font-semibold">Actions</h3>
          <div className="flex flex-col gap-4">
            <IconButton
              icon={<Ticket size={20} />}
              text="Approved"
              bgColor="#059669"
              textColor="#fff"
              onClick={() => {
                setStatus("approved");
                handleSubmit();
              }}
            />
            <IconButton
              icon={<X size={20} />}
              text="Reject"
              bgColor="#DC2626"
              textColor="#fff"
              onClick={() => {
                setStatus("rejected");
                handleSubmit();
              }}
            />
            <IconButton
              icon={<X size={20} />}
              text="Download Payslip"
              bgColor="#000"
              textColor="#fff"
              onClick={() => {}}
            />
            <IconButton
              icon={<X size={20} />}
              text="Email Payslip"
              bgColor="#fff"
              textColor="#000"
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <span>{new Date().toISOString().slice(0, 7)}</span>
      </div>
    </div>
  );
};

export default PayrollScreen;

const EditSalaryCard = ({
  title,
  section,
  fields,
  values,
  onChange,
  total,
}) => {
  return (
    <div className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex flex-col gap-3">
        {fields.map(({ label, name }) => (
          <div key={name} className="flex justify-between items-center">
            <label className="w-1/2 text-sm">{label}</label>
            <input
              type="number"
              value={values[name]}
              min="0"
              onChange={(e) => onChange(section, name, e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm font-semibold text-left">
        Total {title}: ₹ {total.toLocaleString()}
      </div>
    </div>
  );
};
