import HeaderV1 from "components/header/HeaderV1";
import MemberInfoSide from "pages/members/MemberInfoSide";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
const SaleList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    id: "user@example.com",
    name: "홍길동",
    credit_rating: "10",
  });
  const [cookies] = useCookies(["sessionID"]);
  const [componentList, setComponentList] = useState([]);
  useEffect(() => {
    if (!cookies.sessionID) {
      alert("로그인 정보가 유효하지 않습니다!");
      navigate("/login");
      return;
    }
  }, [location.state, cookies.sessionID]);
  return (
    <div>
      <HeaderV1 ID={location.state} />
      <MemberInfoSide ID={location.state} page={"판매목록"} />
    </div>
  );
};
export default SaleList;
