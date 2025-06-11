const LeavesCountCard = ({ title, count, subText, icon }) => {
  return (
    <div className="w-[260px] p-4 bg-white rounded-md flex flex-col gap-2 shadow-md">
      <div className="w-full flex justify-between items-center">
        <span className="text-base font-sans font-medium">{title}</span>
        <span>{icon}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold font-sans">
          {count}
          <span className="text-sm font-sans font-normal ml-1">Days Left</span>
        </span>
        <span className="text-[12px] mt-4">{subText}</span>
      </div>
    </div>
  );
};

export default LeavesCountCard;
