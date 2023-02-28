import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Playground from "./Pages/Playground";
import Toss from "./Pages/Toss";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Playground" element={<Playground />} />
          <Route path="/Toss" element={<Toss />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
