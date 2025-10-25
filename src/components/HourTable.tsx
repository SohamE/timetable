import { createPortal } from "react-dom";
import TaskForm from "./TaskForm";
import { useState } from "react";
import useMainContext from "../hooks/useMainContext";
import { format } from "date-fns";

type HourTablePropsType = {
  hour: string;
  date: Date;
};

const HourTable = ({ hour, date }: HourTablePropsType) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const { tasks, removeTask, editTask } = useMainContext();

  const task = tasks.filter(
    (task) => task.date == format(date, "d-L-yyyy") && task.time == hour
  );
  return (
    <div className="flex items-center h-full w-full">
      <div className="w-[10%] border-r h-full">
        <p>{hour}</p>
      </div>
      <div className="flex w-full gap-3 h-full">
        <div id="task" className="w-[95%]">
          {task.length > 0 ? task[0].task : null}
        </div>
        {task.length > 0 ? (
          <div className="flex gap-4">
            <button>E</button>
            <button onClick={(e) => removeTask({ id: task[0].id })}>D</button>
          </div>
        ) : (
          <button className="w-[5%]" onClick={() => setShowModal((d) => !d)}>
            +
          </button>
        )}
        {showModal && (
          <ModalTaskForm hour={hour} date={date} closeModal={closeModal} />
        )}
      </div>
    </div>
  );
};

const ModalTaskForm = ({
  hour,
  date,
  closeModal,
}: HourTablePropsType & { closeModal: () => void }) => {
  const modalElement = document.getElementById("modal");
  if (!modalElement) return null;
  return createPortal(
    <dialog
      open
      className="fixed inset-0 flex items-center justify-center m-auto"
    >
      <div className="h-[250px] w-[500px] border p-5 bg-white rounded-lg">
        <button onClick={() => closeModal()} className="float-end">
          x
        </button>
        <p className="text-2xl font-bold text-center mb-5">New Task</p>
        <TaskForm time={hour} date={date} closeModal={closeModal} />
      </div>
    </dialog>,
    modalElement
  );
};

export default HourTable;
