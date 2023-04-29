import HeaderV1 from "../../../components/header/HeaderV1";
import MemberInfoSide from "../../members/MemberInfoSide";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const InterestList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({
    id: "user@example.com",
    name: "홍길동",
    credit_rating: "10",
  });
  const [componentList, setComponentList] = useState([]);
  useEffect(() => {}, [location.state]);
  return (
    <div>
      <HeaderV1 ID={location.state} />
      <MemberInfoSide ID={location.state} page={"관심목록"} />
    </div>
  );
};
export default InterestList;
