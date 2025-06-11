import { useForm } from "react-hook-form";
import Select from "../../../Utils/Select";
import Input from "../../../Utils/Input";
import Button from "../../../Utils/Button";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { postLeaveApi } from "../Services/emp-leaves";

export const leaveTypes = [
  { label: "Sick Leave", value: "sick" },
  { label: "Casual Leave", value: "casual" },
  { label: "Annual Leave", value: "annual" },
];

const ApplyLeavesModal = ({ setOpenAddEmpModal, fetchLeaves }) => {
  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedLeaveType, setSelectedLeaveType] = useState("");
  const [startDate, endDate] = watch(["startDate", "endDate"]);

  const onSubmit = async (data) => {
    console.log("Leave form submitted:", data);
    const res = await postLeaveApi({ token, data });
    if (res?.status) {
      setOpenAddEmpModal(false);
      fetchLeaves();
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const start = dayjs(startDate);
      const end = dayjs(endDate);
      const days = end.diff(start, "day") + 1;
      setValue("numberOfDays", days > 0 ? days : 0);
    }
  }, [startDate, endDate, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex gap-10 items-start p-4 h-[440px]"
    >
      {/* Left Form Side */}
      <div className="w-[45%] bg-white flex flex-col gap-4">
        <Select
          label="Leave Type"
          name="leaveType"
          options={leaveTypes}
          firstOption="Leave Type"
          onChange={(e) => {
            setSelectedLeaveType(e.target.value);
            setValue("leaveType", e.target.value);
          }}
          value={selectedLeaveType}
          width="100%"
        />

        <Input
          label="Start Date"
          name="startDate"
          type="date"
          register={register}
          errors={errors}
          validation={{ required: "Start date is required" }}
          extraProps={{ min: today }}
        />

        <Input
          label="End Date"
          name="endDate"
          type="date"
          register={register}
          errors={errors}
          validation={{
            required: "End date is required",
            validate: (value) => {
              if (!startDate) return "Please select start date first";
              if (dayjs(value).isBefore(dayjs(startDate)))
                return "End date should be after start date";
              return true;
            },
          }}
          extraProps={{ min: startDate || today }}
        />

        <Input
          label="Number of Days"
          name="numberOfDays"
          type="number"
          register={register}
          errors={errors}
          readOnly
        />

        <Input
          label="Upload Document"
          name="document"
          type="file"
          register={register}
          errors={errors}
        />
      </div>

      {/* Right Side */}
      <div className="w-[45%] bg-white flex flex-col justify-between h-full gap-4">
        <div>
          <label
            htmlFor="reason"
            className="text-sm font-sans font-semibold mb-1 block"
          >
            Reason for Leave
          </label>
          <textarea
            id="reason"
            {...register("reason", {
              required: "Reason is required",
            })}
            rows={6}
            className={`w-full border rounded-md px-2 py-2 resize-none ${
              errors?.reason ? "border-red-500" : "border-borderColor"
            }`}
          />
          {errors?.reason && (
            <p className="text-red-500 text-xs mt-1">{errors.reason.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            text="Cancel"
            bgColor="bg-white"
            textColor="text-gray-800"
            className="border border-gray-300"
            onClick={() => setOpenAddEmpModal(false)}
          />
          <Button text="Apply Now" type="submit" />
        </div>
      </div>
    </form>
  );
};

export default ApplyLeavesModal;
