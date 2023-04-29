import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../CSS/members/SideMember.css";
const MemberInfoSide = (props) => {
  const navigate = useNavigate();
  const [imgSide, setImgSide] = useState("");
  const userID = props.ID;
  const pageNaming = props.page;
  const [userData, setUserData] = useState({
    id: "user@example.com",
    nick_name: "홍길동",
    credit_rating: "10",
  });
  useEffect(() => {
    /*
    async function getUserInfo() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/info",
          {
            email: userID,
          }
        );
        setUserData(response.data);
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getUserInfo();
    async function getUserIMG() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/profile/standard",
          {
            email: userID,
          },
          { responseType: "arraybuffer" }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setImgSide(URL.createObjectURL(blob));
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getUserIMG();*/
  }, []);
  return (
    <div className="MemberInfoSide">
      <img alt="user" className="useImg" src={imgSide} />
      <p className="Name">
        {userData.nick_name}님의 {pageNaming}
      </p>
      <div className="MemberInfoSideWeight">
        <img
          alt="weight Logo"
          className="weightIMG"
          src="/images/Icon/weightIcon.png"
        />
        <p>매너무게</p>
        <p className="KGP">{userData.credit_rating}KG</p>
      </div>
      {pageNaming === "판매목록" && (
        <button
          onClick={(e) => {
            navigate("/auth/market/MarketPost", { state: userID });
          }}
        >
          작성하기
        </button>
      )}
    </div>
  );
};
MemberInfoSide.defaultProps = {
  userID: "",
  pageNaming: "",
};
export default MemberInfoSide;
