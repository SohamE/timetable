import DayTable from "./components/DayTable";
import MainContextProvider from "./contexts/MainContextProvider";

function App() {
  return (
    <MainContextProvider>
      <DayTable />
    </MainContextProvider>
  );
}

export default App;
