import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import HeaderV2 from "../../../components/header/HeaderV2";
import "../../../CSS/mypage/Mypage.css";
const Mypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, settoken] = useState("");
  const [imgMypage, setImgMypage] = useState("");
  const [Cookie] = useCookies(["token"]);
  const [showStatus, setShowStatus] = useState("SaleList");
  console.log(Cookie);
  const [userData, setUserData] = useState({
    id: "user@example.com",
    name: "홍길동",
    credit_rating: "10",
  });
  const hasUserInfoBeenCalled = useRef(false);
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/info",
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookie.token}`,
            },
          }
        );
        console.log("응답", response);
        setUserData(response.data);
      } catch (err) {
        console.log("오류: ", err);
        alert("오류가 발생했습니다");
      }
    }

    async function getUserIMG() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/profile/standard",
          null,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookie.token}`,
            },
            responseType: "arraybuffer",
          }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setImgMypage(URL.createObjectURL(blob));
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }

    // setTimeout 내에서 hasUserInfoBeenCalled 값을 변경하여 함수가 한 번만 호출되도록 설정합니다.
    if (!hasUserInfoBeenCalled.current) {
      hasUserInfoBeenCalled.current = true;
      getUserInfo();
      getUserIMG();
    }
  }, []);
  const SaleClick = (event) => {
    event.preventDefault();
    setShowStatus("SaleList");
  };
  const PurchaseClick = (event) => {
    event.preventDefault();
    setShowStatus("PurchaseList");
  };
  const StarClick = (event) => {
    event.preventDefault();
    setShowStatus("StarList");
  };
  return (
    <div className="Mypage">
      <HeaderV2 ID={userData.email} />
      <div className="topDiv">
        <img alt="user" className="useImg" src={imgMypage} />
        <div className="Mypage_right">
          <p className="MypageName">{userData.nick_name}</p>

          <div className="WeightDiv">
            <img
              alt="weight Logo"
              className="weightIMG"
              src="/images/Icon/weightIcon.png"
            />
            <p>매너무게</p>
            <p className="useWeight">{userData.credit_rating}KG</p>
          </div>
          <div className="btn_mypage">
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
            <div className="MypageLine"></div>
            <button
              className="toModify"
              onClick={(e) => {
                navigate("/Chat", { state: location.state });
              }}
            >
              채팅 목록
            </button>
            <div className="MypageLine"></div>
            <button
              className="toModify"
              onClick={(e) => {
                navigate("/auth/market/MarketPost", { state: userData.email });
              }}
            >
              판매글 작성
            </button>
          </div>
        </div>
      </div>
      <div className="bottomDiv">
        <div className="BTN_List_Mypage">
          <button
            className={showStatus === "SaleList" ? "active" : "inactive"}
            onClick={SaleClick}
          >
            판매 목록
          </button>
          <button
            className={showStatus === "PurchaseList" ? "active" : "inactive"}
            onClick={PurchaseClick}
          >
            {" "}
            구매 목록
          </button>
          <button
            className={showStatus === "StarList" ? "active" : "inactive"}
            onClick={StarClick}
          >
            {" "}
            관심 목록
          </button>
        </div>
        <div className="showDiv">
          {showStatus == "SaleList" && <p>판매목록</p>}
          {showStatus == "PurchaseList" && <p>구매목록</p>}
          {showStatus == "StarList" && <p>관심목록</p>}
        </div>
      </div>
    </div>
  );
};
export default Mypage;
