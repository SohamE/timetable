import { useContext } from "react";
import { MainContext } from "../contexts/MainContextProvider";

const useMainContext = () => {
  const data = useContext(MainContext);
  if (data == null)
    throw new Error("Outside main context");
  return data;
};

export default useMainContext;