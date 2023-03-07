import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HeaderV1 from "../../../components/header/HeaderV1";
import "../../../CSS/mypage/Mypage.css";
const Mypage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  /*
  useEffect(() => {
    async function getUserInfo() {
      try {
        const dataRecieve = await axios.get(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/info",
          {
            headers: {
              "X-AUTH-TOKEN": localStorage.getItem("token"),
            },
          }
        );
        setUserData(dataRecieve.data);
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getUserInfo();
  }, []);
*/
  return (
    <div className="Mypage">
      <HeaderV1 />
      <div className="leftDiv">
        <button
          onClick={(e) => {
            navigate("/");
          }}
        >
          프로필 수정
        </button>
      </div>
      <div className="rightDiv">
        <button
          onClick={(e) => {
            navigate("/ ");
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
            navigate("/ ");
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
            navigate("/ ");
          }}
        >
          <img
            alt="reciept"
            className="MypageIMG"
            src="/images/Icon/recieptIcon.png"
          />
          판매 내역
        </button>{" "}
        <button
          onClick={(e) => {
            navigate("/ ");
          }}
        >
          <img
            alt="chat"
            className="MypageIMG"
            src="/images/Icon/chatIcon.png"
          />
          채팅 내역
        </button>{" "}
        <button
          onClick={(e) => {
            navigate("/");
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
            navigate("/");
          }}
        >
          <img alt="tag" className="MypageIMG" src="/images/Icon/tagIcon.png" />
          해시태그 알림 설정
        </button>
      </div>
    </div>
  );
};
export default Mypage;
