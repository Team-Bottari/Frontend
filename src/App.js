import "./CSS/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/members/LogIn";
import IDorPW from "./pages/members/IDorPW";
import SignUpStep1 from "./pages/members/SignUpStep1";
import Market from "./pages/Market";
import IDSearch from "./pages/members/IDSearch";
import PWReset from "./pages/members/PWReset";
import SignUpChoice from "./pages/members/SignUpChoice";
import Mypage from "./pages/members/mypage/Mypage";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Market" element={<Market />} />
          <Route path="/IDorPW" element={<IDorPW />} />
          <Route path="/SignUp_1" element={<SignUpStep1 />} />
          <Route path="/IDSearch" element={<IDSearch />} />
          <Route path="/PWReset" element={<PWReset />} />
          <Route path="/SignUpChoice" element={<SignUpChoice />} />
          <Route path="/Mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
