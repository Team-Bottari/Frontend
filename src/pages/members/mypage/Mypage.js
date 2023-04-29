import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderV1 from "../../../components/header/HeaderV1";
import "../../../CSS/mypage/Mypage.css";
const Mypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [imgMypage, setImgMypage] = useState("");
  const [userData, setUserData] = useState({
    email: "user@example.com",
    name: "홍길동",
    credit_rating: "10",
  });

  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/info",
          {
            email: location.state,
          }
        );
        console.log(response);
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
            email: location.state,
          },
          { responseType: "arraybuffer" }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setImgMypage(URL.createObjectURL(blob));
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getUserIMG();
  }, [location.state]);

  return (
    <div className="Mypage">
      <HeaderV1 ID={userData.email} />
      <div className="leftDiv">
        <img alt="user" className="useImg" src={imgMypage} />
        <p className="Name">{userData.nick_name}</p>
        <div className="WeightDiv">
          <img
            alt="weight Logo"
            className="weightIMG"
            src="/images/Icon/weightIcon.png"
          />
          <p>매너무게</p>
          <p className="useWeight">{userData.credit_rating}KG</p>
        </div>
        <button
          className="toModify"
          onClick={(e) => {
            navigate("/auth/mypage/ModifyInfo", {
              state: userData,
              img: imgMypage,
            });
          }}
        >
          프로필 수정
        </button>
      </div>
      <div className="rightDiv">
        <button
          onClick={(e) => {
            navigate("/auth/mypage/InterestList ");
          }}
        >
          <img
            alt="star"
            className="MypageIMG"
            src="/images/Icon/starIcon.png"
          />
          관심 목록
        </button>
        <button
          onClick={(e) => {
            navigate("/auth/mypage/PurchaseList", { state: userData.email });
          }}
        >
          <img
            alt="cart"
            className="MypageIMG"
            src="/images/Icon/cartIcon.png"
          />
          구매 내역
        </button>
        <button
          onClick={(e) => {
            navigate("/auth/mypage/SaleList", { state: userData.email });
          }}
        >
          <img
            alt="reciept"
            className="MypageIMG"
            src="/images/Icon/recieptIcon.png"
          />
          판매 내역
        </button>
        <button
          onClick={(e) => {
            navigate("/auth/mypage/ChattingList", { state: userData.email });
          }}
        >
          <img
            alt="chat"
            className="MypageIMG"
            src="/images/Icon/chatIcon.png"
          />
          채팅 내역
        </button>
        <hr />
        <button
          onClick={(e) => {
            navigate("/Location");
          }}
        >
          <img
            alt="place"
            className="MypageIMG"
            src="/images/Icon/placeIcon.png"
          />
          위치 설정 및 인증
        </button>
        <button
          onClick={(e) => {
            navigate("/auth/mypage/UserHashTag");
          }}
        >
          <img alt="tag" className="MypageIMG" src="/images/Icon/tagIcon.png" />
          해시태그 알림 설정
        </button>
        <button
          onClick={(e) => {
            navigate("/auth/market/MarketPost", { state: userData.email });
          }}
        >
          <img alt="tag" className="MypageIMG" src="/images/Icon/tagIcon.png" />
          임시 글 작성 버튼
        </button>
      </div>
    </div>
  );
};
export default Mypage;
