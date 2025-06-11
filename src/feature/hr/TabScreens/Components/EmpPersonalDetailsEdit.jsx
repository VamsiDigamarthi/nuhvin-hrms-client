import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../../../../Utils/Input";
import Button from "../../../../Utils/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../../Slices/HrEmployeeSlice";

const EmpPersonalDetailsEdit = ({ handleEditPersonalInfo }) => {
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
    if (singleEmployee) reset(singleEmployee); // pre-fill fields with singleEmployee data
  }, [singleEmployee, reset]);

  const onSubmit = async (data) => {
    dispatch(
      updateEmployee({
        id: singleEmployee._id,
        payload: data,
        token,
      })
    );
    handleEditPersonalInfo();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-xl font-sans font-semibold">
        Edit Personal Information
      </h2>

      {/* Row 1: Full Name & Gender */}
      <div className="flex gap-4">
        <Input
          label="Full Name"
          name="name"
          register={register}
          errors={errors}
          validation={{ required: "Full Name is required" }}
        />
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full border h-[45px] p-2 rounded-md"
            defaultValue={singleEmployee?.gender}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Fe-Male</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs">{errors.gender.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Date of Birth & Mobile */}
      <div className="flex gap-4">
        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          register={register}
          errors={errors}
          validation={{ required: "DOB is required" }}
        />
        <Input
          label="Mobile"
          name="mobile"
          register={register}
          errors={errors}
          validation={{ required: "Mobile is required" }}
        />
      </div>

      {/* Row 3: Nationality & Marital Status */}
      <div className="flex gap-4">
        <Input
          label="Nationality"
          name="nationality"
          register={register}
          errors={errors}
          validation={{ required: "Nationality is required" }}
        />
        <div className="w-full">
          <label className="block text-sm font-medium mb-1">
            Marriage Status
          </label>
          <select
            {...register("marriageStatus", { required: "Status is required" })}
            className="w-full border p-2 h-[45px] rounded-md"
            defaultValue={singleEmployee?.marriageStatus}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Married">Married</option>
            <option value="Un-Married">Un-Married</option>
          </select>
          {errors.marriageStatus && (
            <p className="text-red-500 text-xs">
              {errors.marriageStatus.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 4: Email & Personal Tax ID */}
      <div className="flex gap-4">
        <Input
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          validation={{ required: "Email is required" }}
        />
        <Input
          label="Personal Tax ID"
          name="taxId"
          register={register}
          errors={errors}
          validation={{ required: "Tax ID is required" }}
        />
      </div>

      {/* Row 5: Health Insurance & Social Insurance */}
      <div className="flex gap-4">
        <Input
          label="Health Insurance"
          name="insurance"
          register={register}
          errors={errors}
          validation={{ required: "Insurance info is required" }}
        />
        <Input
          label="Social Insurance"
          name="socialInsurance"
          register={register}
          errors={errors}
          validation={{ required: "Social Insurance is required" }}
        />
      </div>

      <div className="mt-4 w-full flex justify-end items-end ">
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
            Update Employee
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmpPersonalDetailsEdit;
