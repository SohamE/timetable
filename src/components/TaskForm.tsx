import React, { useState } from "react";
import useMainContext from "../hooks/useMainContext";
import { format } from "date-fns";

type TaskFormType = {
  date: Date;
  time: string;
  closeModal: () => void;
};

const TaskForm: React.FC<TaskFormType> = ({ date, time, closeModal }) => {
  const [task, setTask] = useState("");
  const { addTask } = useMainContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask({ task, date: format(date, "d-L-yyyy"), time });
    closeModal();
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="task">Task</label>
        <textarea
          name="task"
          id="task"
          value={task}
          className="border"
          autoFocus
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value="Save"
        className="bg-lime-600 text-white pt-2 pb-2"
      />
    </form>
  );
};

export default TaskForm;
