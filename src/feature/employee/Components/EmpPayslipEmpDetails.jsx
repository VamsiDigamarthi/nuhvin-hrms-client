import { useSelector } from "react-redux";

const EmpPayslipEmpDetails = () => {
  const { profile, loading, error } = useSelector((state) => state.profile); // assuming reducer key is `profile`
  // console.log("profile", profile);

  return (
    <div className="w-full flex flex-wrap gap-4">
      <EmpDetails lable="Employee Name" value={profile?.name} />
      <EmpDetails
        lable="Designation"
        value={profile?.jobTimeline?.[0]?.jobTitle}
      />
      <EmpDetails lable="Employee ID" value={profile?.empId} />
      <EmpDetails
        lable="Department"
        value={profile?.jobTimeline?.[0]?.positionType}
      />
      <EmpDetails lable="Bank Account" value="XXXX-4589" />
    </div>
  );
};

export default EmpPayslipEmpDetails;

const EmpDetails = ({ lable, value }) => {
  return (
    <div className="w-[30%] flex flex-col gap-0">
      <p className="text-[10px] font-sans font-medium text-[#6B7280]">
        {lable}
      </p>
      <p className="w-full font-sans font-semibold text-black text-[14px]">
        {value}
      </p>
    </div>
  );
};
