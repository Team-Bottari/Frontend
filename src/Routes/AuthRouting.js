import { Route, Routes } from "react-router-dom";
import MyPageR from "./MyPageRouting";
import MemberR from "./MemberRouting";

function AuthRouting() {
  return (
    <Routes>
      <Route path="/auth/*">
        <MyPageR />
        <MemberR />
      </Route>
    </Routes>
  );
}

export default AuthRouting;
