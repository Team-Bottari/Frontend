import "./CSS/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/members/LogIn";
import Market from "./pages/Market";
import Mypage from "./pages/members/mypage/Mypage";
import AuthRouting from "./Routes/AuthRouting";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Market" element={<Market />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/auth/*" element={<AuthRouting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
