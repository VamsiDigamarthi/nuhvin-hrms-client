import React from "react";
import BorderEditIconCard from "../../../Utils/BorderEditIconCard";
import DetailsDisplayCard from "../../../Utils/DetailsDisplayCard";

const GeneralDetailsScreen = ({ employee }) => {
  return (
    <div className="flex flex-col gap-4">
      <BorderEditIconCard lable="Personal Info">
        <div className="w-full flex gap-4">
          <div className="w-[50%] flex flex-col gap-2">
            <DetailsDisplayCard left="Full Name" right={employee?.name} />
            <DetailsDisplayCard left="Date of Birth" right={employee?.dob} />
            <DetailsDisplayCard
              left="Nationality"
              right={employee?.nationality}
            />
            <DetailsDisplayCard left="Email Address" right={employee?.email} />
            <DetailsDisplayCard
              left="Health Insurance"
              right={employee?.insurance}
            />
          </div>
          <div className="w-[50%] flex flex-col gap-2">
            <DetailsDisplayCard left="Gender" right={employee?.gender} />
            <DetailsDisplayCard
              left="Martial Status"
              right={employee?.marriageStatus}
            />
            <DetailsDisplayCard
              left="Personal Tax ID"
              right={employee?.taxId}
            />
            <DetailsDisplayCard
              left="Social Insurance"
              right={employee?.socialInsurance}
            />
            <DetailsDisplayCard left="Phone Number" right={employee?.mobile} />
          </div>
        </div>
      </BorderEditIconCard>
    </div>
  );
};

export default GeneralDetailsScreen;
