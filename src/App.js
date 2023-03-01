import "./CSS/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/members/LogIn";
import IDorPW from "./pages/members/IDorPW";
import SignUpStep1 from "./pages/members/SignUpStep1.js";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/IDorPW" element={<IDorPW />} />
          <Route path="/SignUp_1" element={<SignUpStep1 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
