import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderV1 from "../../../components/header/HeaderV1";
import "../../../CSS/mypage/ModifyInfo.css";
const ModifyInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(location.state);
  return (
    <div className="ModifyInfo">
      <HeaderV1 />
      <div className="side"></div>
      <div className="leftDiv">
        <img alt="user" className="useImg" src={userData.img} />
        <input
          id="name_input"
          type="text"
          name="Name"
          value={userData.name}
          onChange={(event) =>
            setUserData(...userData, (userData.name = event.target.value))
          }
        />
        <button onClick={console.log(userData)}>sdsdsd</button>
      </div>
      <div className="rightDiv"></div>
    </div>
  );
};
export default ModifyInfo;
