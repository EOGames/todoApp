import { Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element ={<Todo />}  />
      </Routes>
    </div>
  );
}

export default App;
