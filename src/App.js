import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Playground from "./Pages/Playground";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Playground" element={<Playground />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
