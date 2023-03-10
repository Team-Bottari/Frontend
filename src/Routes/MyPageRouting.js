import { Route, Routes } from "react-router-dom";
import ModifyInfo from "../pages/members/mypage/ModifyInfo";
import ChattingList from "../pages/members/mypage/ChattingList";
import InterestList from "../pages/members/mypage/InterestList";
import PurchaseList from "../pages/members/mypage/PurchaseList";
import SaleList from "../pages/members/mypage/SaleList";
import UserHashTag from "../pages/members/mypage/UserHashTag";
import PWConfirm from "../pages/members/mypage/PWConfirm";
import Withdraw from "../pages/members/mypage/Withdraw";
function MyPageRouting() {
  return (
    <Routes>
      <Route path="/ModifyInfo" element={<ModifyInfo />} />
      <Route path="/ChattingList" element={<ChattingList />} />
      <Route path="/InterestList" element={<InterestList />} />
      <Route path="/PurchaseList" element={<PurchaseList />} />
      <Route path="/SaleList" element={<SaleList />} />
      <Route path="/UserHashTag" element={<UserHashTag />} />
      <Route path="/PWConfirm" element={<PWConfirm />} />
      <Route path="/Withdraw" element={<Withdraw />} />
    </Routes>
  );
}

export default MyPageRouting;
