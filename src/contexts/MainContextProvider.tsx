import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type TaskType = {
  id: string;
  task: string;
  date: string;
  time: string;
};
type addTaskType = (task: Omit<TaskType, "id">) => void;
type removeTaskType = (task: Omit<TaskType, "task" | "date" | "time">) => void;
type editTaskType = (task: Omit<TaskType, "date" | "time">) => void;

type MainContextValue = {
  tasks: Array<TaskType>;
  addTask: addTaskType;
  removeTask: removeTaskType;
  editTask: editTaskType;
};

export const MainContext = createContext<MainContextValue | null>(null);

const MainContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useLocalStorage<Array<TaskType>>([], "mainTasks");

  const addTask: addTaskType = ({ date, time, task }) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        task,
        date,
        time,
      },
    ]);
  };
  const removeTask: removeTaskType = ({ id }) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
  };

  const editTask: editTaskType = ({ id, task }) => {
    setTasks((prevTasks) =>
      prevTasks.map((currTask) =>
        currTask.id == id ? { ...currTask, task } : currTask
      )
    );
  };
  return (
    <MainContext.Provider value={{ tasks, addTask, editTask, removeTask }}>
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;
