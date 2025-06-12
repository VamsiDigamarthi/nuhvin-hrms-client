import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../Utils/Input";
import Button from "../../../../Utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../Slices/HrEmployeeSlice";

const EmpPersonalAddressEdit = ({ handleEditAddress }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { singleEmployee } = useSelector((state) => state.employeeList);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (singleEmployee?.address) {
      reset(singleEmployee.address); // prefill address fields
    }
  }, [singleEmployee, reset]);

  const onSubmit = async (data) => {
    dispatch(
      updateEmployee({
        id: singleEmployee._id,
        payload: { address: data },
        token,
      })
    );
    handleEditAddress();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-xl font-sans font-semibold">
        Edit Address Information
      </h2>

      <Input
        label="Primary Address"
        name="primaryAddress"
        register={register}
        errors={errors}
        validation={{ required: "Primary Address is required" }}
      />

      <Input
        label="Country"
        name="country"
        register={register}
        errors={errors}
        validation={{ required: "Country is required" }}
      />

      <Input
        label="State"
        name="state"
        register={register}
        errors={errors}
        validation={{ required: "State is required" }}
      />

      <Input
        label="City"
        name="city"
        register={register}
        errors={errors}
        validation={{ required: "City is required" }}
      />

      <Input
        label="Post Code"
        name="postCode"
        register={register}
        errors={errors}
        validation={{ required: "Post Code is required" }}
      />

      <div className="mt-4 w-full flex justify-end items-end">
        <div className="w-full flex items-center gap-4">
          <Button bgColor="bg-[#f5f5f5]" textColor="text-black">
            Cancel
          </Button>
          <Button
            bgColor="bg-black"
            textColor="text-white"
            type="submit"
            loading={isSubmitting}
          >
            Update Address
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmpPersonalAddressEdit;
