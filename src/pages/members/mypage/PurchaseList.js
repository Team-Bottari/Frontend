import HeaderV1 from "components/header/HeaderV1";
import MemberInfoSide from "pages/members/MemberInfoSide";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import dummy from "../../market/data.json";
import React from "react";

import axios from "axios";
import History from "components/members/History";
import { GiWeightLiftingUp } from "react-icons/gi";
import HeaderV2 from "components/header/HeaderV2";
const PurchaseList = () => {
  /**   const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    id: "user@example.com",
    name: "홍길동",
    credit_rating: "10",
  });
  const [componentList, setComponentList] = useState([]);
  const [cookies] = useCookies(["sessionID"]);
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
      <MemberInfoSide ID={location.state} page={"구매목록"} />
    </div>
  );*/
  return <History pagename={"구매내역"} dummy={dummy}></History>;
};
export default PurchaseList;
