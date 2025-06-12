import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../Utils/Input";
import Button from "../../../../Utils/Button";
import { updateEmployee } from "../../Slices/HrEmployeeSlice";

const EmpEmergancyDetailsEdit = ({ handleEditEmergency }) => {
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
    if (singleEmployee?.emergencyContact) {
      reset(singleEmployee.emergencyContact); // prefill emergency fields
    }
  }, [singleEmployee, reset]);

  const onSubmit = async (data) => {
    dispatch(
      updateEmployee({
        id: singleEmployee._id,
        payload: { emergencyContact: data },
        token,
      })
    );
    handleEditEmergency();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-xl font-sans font-semibold">
        Edit Emergency Contact Details
      </h2>

      <Input
        label="Full Name"
        name="fullName"
        register={register}
        errors={errors}
        validation={{ required: "Full name is required" }}
      />

      <Input
        label="Phone Number"
        name="phoneNumber"
        register={register}
        errors={errors}
        validation={{ required: "Phone number is required" }}
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        register={register}
        errors={errors}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email format",
          },
        }}
      />

      <div className="w-full">
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select
          {...register("gender", { required: "Gender is required" })}
          className="w-full border h-[45px] p-2 rounded-md"
          defaultValue={singleEmployee?.emergencyContact?.gender || ""}
        >
          <option value="" disabled>
            Select
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-xs">{errors.gender.message}</p>
        )}
      </div>

      <Input
        label="Address"
        name="address"
        register={register}
        errors={errors}
        validation={{ required: "Address is required" }}
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
            Update Emergency Contact
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmpEmergancyDetailsEdit;
