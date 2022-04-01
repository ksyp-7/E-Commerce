import { BrowserRouter as Routes } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./globalState";
import Header from "./components/hedars/Header";
import MainPages from "./components/mainpages/Pages"

function App() {
  return (
    <DataProvider>
      <Routes>
        <div className="App">
          <Header />
          <MainPages /> 
        </div>
      </Routes>
    </DataProvider>
  );
}

export default App;
