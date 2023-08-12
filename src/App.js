import "./CSS/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./pages/members/LogIn";
import Chat from "./pages/chatting/Chat";
import Location from "./pages/members/Location";
import Mypage from "./pages/members/mypage/Mypage";
import AuthRouting from "./Routes/AuthRouting";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Mypage" element={<Mypage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/auth/*" element={<AuthRouting />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
