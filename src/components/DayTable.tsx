import HourTable from "./HourTable";
import Header from "./Header";
import { useState } from "react";
import { add } from "date-fns";

const DayTable = () => {
  const [date, setDate] = useState(new Date());

  const nextDate = () => {
    setDate((d) => add(d, { days: 1 }));
  };
  const prevDate = () => {
    setDate((d) => add(d, { days: -1 }));
  };

  const hours = [];
  for (let i = 0; i < 24; i++) {
    let time = i < 12 ? i : i - 12;
    if (time == 0) {
      hours.push(`${12} ${i < 12 ? "AM" : "PM"}`);
    } else {
      hours.push(`${time} ${i < 12 ? "AM" : "PM"}`);
    }
  }

  return (
    <>
      <Header date={date} nextDate={nextDate} prevDate={prevDate} />
      <div className="mt-5 border-t">
        {hours.map((hour) => (
          <div key={hour} className={`h-[100px] border-b`}>
            <HourTable hour={hour} date={date} />
          </div>
        ))}
      </div>
    </>
  );
};

export default DayTable;
