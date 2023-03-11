import { Route, Routes } from "react-router-dom";
import IDorPW from "../pages/members/IDorPW";
import Register from "../pages/members/Register";
import IDSearch from "../pages/members/IDSearch";
import PWReset from "../pages/members/PWReset";
import SignUpChoice from "../pages/members/SignUpChoice";
function MemberRouting() {
  return (
    <Routes>
      <Route path="/IDorPW" element={<IDorPW />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/IDSearch" element={<IDSearch />} />
      <Route path="/PWReset" element={<PWReset />} />
      <Route path="/SignUpChoice" element={<SignUpChoice />} />
    </Routes>
  );
}

export default MemberRouting;
