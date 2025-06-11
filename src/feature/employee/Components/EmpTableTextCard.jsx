import { useState } from "react";
import IconButton from "../../../Utils/IconButon";
import { Plus } from "lucide-react";
import Modal from "../../../Utils/Modal";
import ApplyLeavesModal from "../Modal/ApplyLeavesModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const EmpTableTextCard = ({ fetchLeaves, date, setDate }) => {
  const [openAddEmpModal, setOpenAddEmpModal] = useState(false);
  return (
    <>
      <div className="w-full shadown-custom rounded-md p-3 flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="text-lg font-sans font-semibold">
              Leave Management
            </h2>
            <span className="text-sm font-sans font-normal text-gray-400">
              Last 3 Months
            </span>
          </div>
          <div className="flex gap-4 items-center-">
            <DatePicker
              selected={date}
              onChange={(selectedDate) => {
                const formatted = dayjs(selectedDate).format("YYYY-MM-DD");
                setDate(formatted);
              }}
              dateFormat="yyyy-MM-dd"
              className="border border-gray-300 rounded-md p-2"
              placeholderText="YYYY-MM-DD"
              // minDate={new Date()} // disables past dates
            />
            <IconButton
              icon={<Plus size={16} />}
              text="Apply for Leaves"
              onClick={() => setOpenAddEmpModal(true)}
              bgColor="black"
              textColor="#fff"
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={openAddEmpModal}
        onClose={() => setOpenAddEmpModal(false)}
        title="Apply Leave"
        width="66%"
        height="90%"
      >
        <ApplyLeavesModal
          fetchLeaves={fetchLeaves}
          setOpenAddEmpModal={setOpenAddEmpModal}
        />
      </Modal>
    </>
  );
};

export default EmpTableTextCard;
