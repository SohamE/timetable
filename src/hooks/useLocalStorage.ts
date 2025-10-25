import { useEffect, useState } from "react";

const useLocalStorage = <T>(defaultValue: T, key: string): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [tasks, setTasks] = useState<T>((): T => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      return defaultValue;
    } else {
      return JSON.parse(localValue);
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks, key]);

  return [tasks, setTasks];
};

export default useLocalStorage;