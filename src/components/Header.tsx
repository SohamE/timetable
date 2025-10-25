import { format } from "date-fns";

const Header = ({
  date,
  nextDate,
  prevDate,
}: {
  date: Date;
  nextDate: () => void;
  prevDate: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-3xl font-bold w-[30%]">
        {format(date, "do MMMM, yyy")}
      </h1>
      <div className="w-[8%] text-2xl flex gap-2 justify-between pl-5 pr-5">
        <button onClick={() => prevDate()}>{"<"}</button>
        <button onClick={() => nextDate()}>{">"}</button>
      </div>
    </div>
  );
};

export default Header;
