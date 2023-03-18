import { Route, Routes } from "react-router-dom";
import MyPageR from "./MyPageRouting";
import MemberR from "./MemberRouting";
import MarketR from "./MarketRouting";
function AuthRouting() {
  return (
    <Routes path="/auth/*">
      <Route path="mypage/*" element={<MyPageR />} />
      <Route path="member/*" element={<MemberR />} />
      <Route path="market/*" element={<MarketR />} />
    </Routes>
  );
}

export default AuthRouting;
