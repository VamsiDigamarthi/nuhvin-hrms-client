import React from "react";
import IconButton from "../../../Utils/IconButon";
import { Download, Plus } from "lucide-react";

const HrEmployeesManaFirstCard = () => {
  return (
    <div className="flex  justify-between items-center">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold font-sans">Employees</h2>
        <span className="text-sm font-normal font-sans text-gray-700">
          Manage your Employee{" "}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <IconButton
          icon={<Download size={20} />}
          text="Download"
          onClick={() => {}}
        />
        <IconButton
          icon={<Plus size={20} />}
          text="Download"
          onClick={() => {}}
          bgColor="black"
          textColor="#fff"
        />
      </div>
    </div>
  );
};

export default HrEmployeesManaFirstCard;
