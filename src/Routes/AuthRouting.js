import { Route, Routes } from "react-router-dom";
import MyPageR from "./MyPageRouting";
import MemberR from "./MemberRouting";

function AuthRouting() {
  return (
    <Routes path="/auth/*">
      <Route path="mypage/*" element={<MyPageR />} />
      <Route path="member/*" element={<MemberR />} />
    </Routes>
  );
}

export default AuthRouting;
