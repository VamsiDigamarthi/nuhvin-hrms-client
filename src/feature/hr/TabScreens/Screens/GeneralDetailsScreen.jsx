import React, { useState } from "react";
import BorderEditIconCard from "../../../../Utils/BorderEditIconCard";
import DetailsDisplayCard from "../../../../Utils/DetailsDisplayCard";
import Drawer from "../../../../Utils/Drawer";
import { useGeneralDetailsScreenHook } from "../Hooks/GeneralDetailsScreen.Hook";
import EmpPersonalDetailsEdit from "../Components/EmpPersonalDetailsEdit";
import EmpPersonalAddressEdit from "../Components/EmpPersonalAddressEdit";
import EmpEmergancyDetailsEdit from "../Components/EmpEmergancyDetailsEdit";

const GeneralDetailsScreen = () => {
  const {
    personalInfo,
    addressInfo,
    emergencyInfo,
    isOpenPerInfoDrawer,
    isOpenAddressInfoDrawer,
    isOpenEmerContDrawer,
    handleEditPersonalInfo,
    handleEditAddressInfo,
    handleEditEmerConInfo,
  } = useGeneralDetailsScreenHook();

  return (
    <>
      <div className="flex flex-col gap-4">
        <BorderEditIconCard
          lable="Personal Info"
          onClick={handleEditPersonalInfo}
        >
          <TwoColumnDetails data={personalInfo} />
        </BorderEditIconCard>

        <BorderEditIconCard lable="Address" onClick={handleEditAddressInfo}>
          <SingleColumnDetails data={addressInfo} />
        </BorderEditIconCard>

        <BorderEditIconCard
          lable="Emergency Contact"
          onClick={handleEditEmerConInfo}
        >
          <SingleColumnDetails data={emergencyInfo} />
        </BorderEditIconCard>
      </div>
      {/* PersonalInfo drawer */}
      <Drawer
        isOpen={isOpenPerInfoDrawer}
        onClose={handleEditPersonalInfo}
        anotherStyles="w-[45%]"
      >
        <EmpPersonalDetailsEdit
          handleEditPersonalInfo={handleEditPersonalInfo}
        />
      </Drawer>
      <Drawer
        isOpen={isOpenAddressInfoDrawer}
        onClose={handleEditAddressInfo}
        anotherStyles="w-[30%]"
      >
        <EmpPersonalAddressEdit handleEditAddress={handleEditAddressInfo} />
      </Drawer>
      <Drawer
        isOpen={isOpenEmerContDrawer}
        onClose={handleEditEmerConInfo}
        anotherStyles="w-[30%]"
      >
        <EmpEmergancyDetailsEdit handleEditEmergency={handleEditEmerConInfo} />
      </Drawer>
    </>
  );
};

export default GeneralDetailsScreen;

export const TwoColumnDetails = ({ data = [] }) => {
  return (
    <div className="w-full flex gap-4">
      {[0, 1].map((col) => (
        <div key={col} className="w-[50%] flex flex-col gap-2">
          {data.slice(col * 5, col * 5 + 5).map((item, idx) => (
            <DetailsDisplayCard key={idx} {...item} />
          ))}
        </div>
      ))}
    </div>
  );
};

export const SingleColumnDetails = ({ data = [] }) => {
  return (
    <div className="w-[50%] flex flex-col gap-2">
      {data.map((item, idx) => (
        <DetailsDisplayCard key={idx} {...item} />
      ))}
    </div>
  );
};
