import "./CSS/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/members/LogIn";
import Chat from "./pages/chatting/Chat";
import Chat2 from "./pages/chatting/Chat2";
import Location from "./pages/members/Location";
import Mypage from "./pages/members/mypage/Mypage";
import AuthRouting from "./Routes/AuthRouting";
import Market from "./pages/market/Market";
import Purchaselist from "./pages/members/mypage/PurchaseList";
import Interestlist from "./pages/members/mypage/InterestList";
import Register from "./pages/members/Register";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Chat2" element={<Chat2 />} />
          <Route path="/auth/*" element={<AuthRouting />} />
          <Route path="/Purchaselist" element={<Purchaselist />} />
          <Route path="/Interestlist" element={<Interestlist />} />
          <Route path="/Market" element={<Market />} />
          <Route path="/Register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
