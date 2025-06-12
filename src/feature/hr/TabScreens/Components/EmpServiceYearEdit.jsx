import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../Utils/Input";
import Button from "../../../../Utils/Button";
import { updateEmployee } from "../../Slices/HrEmployeeSlice";

const EmpServiceYearEdit = ({ handleEditServiceYear }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { singleEmployee } = useSelector((state) => state.employeeList);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(
    "singleEmployee?.jobTimeline?.[0]?.effectiveDate",
    singleEmployee?.jobTimeline?.[0]?.effectiveDate
  );
  useEffect(() => {
    if (singleEmployee) {
      reset({
        empId: singleEmployee.empId || "",
        joiningDate: singleEmployee?.jobTimeline?.[0]?.effectiveDate
          ? new Date(singleEmployee?.jobTimeline?.[0]?.effectiveDate)
              .toISOString()
              .split("T")[0]
          : "",
      });
    }
  }, [singleEmployee, reset]);

  const onSubmit = async (data) => {
    const updatedTimeline = [...(singleEmployee.jobTimeline || [])];

    // If first timeline exists, update effectiveDate
    if (updatedTimeline.length > 0) {
      updatedTimeline[0] = {
        ...updatedTimeline[0],
        effectiveDate: data.joiningDate,
      };
    } else {
      // If no timeline exists, add new entry
      updatedTimeline.push({
        effectiveDate: data.joiningDate,
      });
    }

    const payload = {
      empId: data.empId,
      joiningDate: data.joiningDate,
      jobTimeline: updatedTimeline,
    };

    dispatch(
      updateEmployee({
        id: singleEmployee._id,
        payload,
        token,
      })
    );

    handleEditServiceYear();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-xl font-sans font-semibold">
        Edit Service Year Info
      </h2>

      <Input
        label="Employee ID"
        name="empId"
        register={register}
        errors={errors}
        validation={{ required: "Employee ID is required" }}
      />

      <Input
        label="Joining Date"
        name="joiningDate"
        type="date"
        register={register}
        defaultValue={
          singleEmployee?.jobTimeline?.[0]?.effectiveDate
            ? new Date(singleEmployee?.jobTimeline?.[0]?.effectiveDate)
                .toISOString()
                .split("T")[0]
            : ""
        }
        errors={errors}
        validation={{ required: "Joining Date is required" }}
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
            Update Service Info
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmpServiceYearEdit;
