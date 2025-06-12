import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../../Utils/Input";
import Button from "../../../../Utils/Button";
import { updateEmployee } from "../../Slices/HrEmployeeSlice";

const EmpJobTimeLineEdit = ({ handleEditTimeline }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { singleEmployee } = useSelector((state) => state.employeeList);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const timeline = singleEmployee?.jobTimeline?.[0] || {};

  useEffect(() => {
    reset({
      effectiveDate: timeline?.effectiveDate
        ? new Date(timeline.effectiveDate).toISOString().split("T")[0]
        : "",
      jobTitle: timeline?.jobTitle || "",
      positionType: timeline?.positionType || "",
      seatNo: timeline?.seatNo || "",
      location: timeline?.location || "",
      employmentType: timeline?.employmentType || "",
      startTime: timeline?.shiftTimmings?.startTime || "",
      endTime: timeline?.shiftTimmings?.endTime || "",
    });
  }, [singleEmployee, reset]);

  const onSubmit = (data) => {
    const updatedTimeline = [...(singleEmployee.jobTimeline || [])];

    // Only update the first row
    updatedTimeline[0] = {
      effectiveDate: data.effectiveDate,
      jobTitle: data.jobTitle,
      positionType: data.positionType,
      seatNo: data.seatNo,
      location: data.location,
      employmentType: data.employmentType,
      shiftTimmings: {
        startTime: data.startTime,
        endTime: data.endTime,
      },
    };

    const payload = {
      jobTimeline: updatedTimeline,
    };

    dispatch(
      updateEmployee({
        id: singleEmployee._id,
        payload,
        token,
      })
    );

    handleEditTimeline(); // close modal or notify
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <h2 className="text-xl font-semibold">Edit Job Timeline</h2>

      <Input
        label="Effective Date"
        name="effectiveDate"
        type="date"
        register={register}
        defaultValue={timeline?.effectiveDate}
        errors={errors}
        validation={{ required: "Effective date is required" }}
      />

      <Input
        label="Job Title"
        name="jobTitle"
        register={register}
        errors={errors}
        validation={{ required: "Job title is required" }}
      />

      <Input
        label="Position Type"
        name="positionType"
        register={register}
        errors={errors}
      />

      <Input
        label="Seat No"
        name="seatNo"
        register={register}
        errors={errors}
      />

      <Input
        label="Location"
        name="location"
        register={register}
        errors={errors}
      />

      <Input
        label="Employment Type"
        name="employmentType"
        register={register}
        errors={errors}
      />

      <div className="flex gap-4">
        <Input
          label="Shift Start Time"
          name="startTime"
          type="time"
          register={register}
          errors={errors}
        />
        <Input
          label="Shift End Time"
          name="endTime"
          type="time"
          register={register}
          errors={errors}
        />
      </div>

      <div className="mt-4 flex justify-end gap-4">
        <Button
          bgColor="bg-gray-200"
          textColor="text-black"
          onClick={handleEditTimeline}
        >
          Cancel
        </Button>
        <Button
          bgColor="bg-black"
          textColor="text-white"
          type="submit"
          loading={isSubmitting}
        >
          Update Timeline
        </Button>
      </div>
    </form>
  );
};

export default EmpJobTimeLineEdit;
