import LeavesCountCard from "../Components/LeavesCountCard";
import { useLeavseCountCardData } from "../Hooks/LeavesCountCardData";
import EmpTableTextCard from "../Components/EmpTableTextCard";
import { useEmpLeavesScreenDataHook } from "../Hooks/EmpLeavesScreen.Hook.data";
import Table from "../../../Utils/Table/Table";
import { useLeavesScreenHook } from "../Hooks/EmpLeavesScreen.Hook";
import StatusWrapper from "../../../Utils/StatusWrapper";
import NoDate from "../../../Utils/NoDate";

const EmpLeavesScreen = () => {
  const { leaves, fetchLeaves, date, setDate, error, isLoading } =
    useLeavesScreenHook();
  const leavesCount = useLeavseCountCardData();
  const { columns } = useEmpLeavesScreenDataHook();

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex gap-4 flex-wrap justify-between items-center">
        {leavesCount.map((card, index) => (
          <LeavesCountCard
            key={index}
            title={card.title}
            count={card.count}
            subText={card.subText}
            icon={card.icon}
          />
        ))}
      </div>
      <div className="p-3  bg-white">
        <EmpTableTextCard
          date={date}
          setDate={setDate}
          fetchLeaves={fetchLeaves}
        />
        <StatusWrapper loading={isLoading} error={error}>
          {leaves?.length ? (
            <Table
              data={leaves}
              columns={columns}
              isDisplayPagination={false}
            />
          ) : (
            <NoDate />
          )}
        </StatusWrapper>
      </div>
    </div>
  );
};

export default EmpLeavesScreen;
