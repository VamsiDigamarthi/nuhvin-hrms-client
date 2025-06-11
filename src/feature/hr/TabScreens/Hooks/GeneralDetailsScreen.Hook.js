import { useState } from "react";
import { useSelector } from "react-redux";

export const useGeneralDetailsScreenHook = () => {
  const { singleEmployee } = useSelector((state) => state.employeeList);
  const personalInfo = [
    { left: "Full Name", right: singleEmployee?.name },
    { left: "Date of Birth", right: singleEmployee?.dob },
    { left: "Nationality", right: singleEmployee?.nationality },
    { left: "Email Address", right: singleEmployee?.email },
    { left: "Health Insurance", right: singleEmployee?.insurance },
    { left: "Gender", right: singleEmployee?.gender },
    { left: "Martial Status", right: singleEmployee?.marriageStatus },
    { left: "Personal Tax ID", right: singleEmployee?.taxId },
    { left: "Social Insurance", right: singleEmployee?.socialInsurance },
    { left: "Phone Number", right: singleEmployee?.mobile },
  ];

  const addressInfo = [
    { left: "Primary Address", right: singleEmployee?.address?.primaryAddress },
    { left: "Country", right: singleEmployee?.address?.country },
    { left: "State/Province", right: singleEmployee?.address?.state },
    { left: "City", right: singleEmployee?.address?.city },
    { left: "Post Code", right: singleEmployee?.address?.postCode },
  ];

  const emergencyInfo = [
    { left: "Full Name", right: singleEmployee?.emergencyContact?.fullName },
    {
      left: "Phone Number",
      right: singleEmployee?.emergencyContact?.phoneNumber,
    },
    { left: "Email Address", right: singleEmployee?.emergencyContact?.email },
    { left: "Gender", right: singleEmployee?.emergencyContact?.gender },
    { left: "Address", right: singleEmployee?.emergencyContact?.address },
  ];
  const [isOpenPerInfoDrawer, setIsOpenPerInfoDrawer] = useState(false);
  const [isOpenAddressInfoDrawer, setIsOpenAddressInfoDrawer] = useState(false);
  const [isOpenEmerContDrawer, setOpenEmerContDrawer] = useState(false);

  const handleEditPersonalInfo = () =>
    setIsOpenPerInfoDrawer(!isOpenPerInfoDrawer);

  const handleEditAddressInfo = () =>
    setIsOpenAddressInfoDrawer(!isOpenAddressInfoDrawer);

  const handleEditEmerConInfo = () =>
    setOpenEmerContDrawer(!isOpenEmerContDrawer);

  return {
    personalInfo,
    addressInfo,
    emergencyInfo,
    isOpenPerInfoDrawer,
    isOpenAddressInfoDrawer,
    isOpenEmerContDrawer,
    handleEditPersonalInfo,
    handleEditAddressInfo,
    handleEditEmerConInfo,
  };
};
