import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "CSS/members/Login.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const LogIn = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [cookies, setCookie] = useCookies(["sessionID"]);

  const LoginClick = async (event) => {
    event.preventDefault();
    console.log(ID, PW);
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/login", {
        email: ID,
        pw: PW,
      })
      .then((response) => {
        if (response.data.sign_in === true) {
          console.log(response);
          //setCookie("sessionID", response.data.sessionID, { path: "/" }); // 세션 ID를 쿠키로 저장
          navigate("/Mypage", { state: ID });
        } else {
          console.log(response);
          alert("로그인에 실패했습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
      });
  };

  const kakaoClick = async (event) => {
    event.preventDefault();
    console.log("Kakao Login");
  };

  const googleClick = (event) => {
    event.preventDefault();
    console.log("google Login");
  };

  const naverClick = async (event) => {
    event.preventDefault();
    console.log("Naver Login");
  };

  return (
    <div className="LogIn">
      <div className="Logo">
        <img alt="main Logo" className="LogoIMG" src="/images/LogoWhite.png" />
      </div>
      <div className="InputMaterial">
        <form>
          <div className="Input">
            <div className="InputLabel">
              <label htmlFor="ID_input">Email</label>
            </div>
            <input
              id="ID_input"
              type="email"
              name="ID"
              value={ID}
              onChange={(event) => setID(event.target.value)}
            />
          </div>
          <br />
          <div className="Input">
            <div className="InputLabel">
              <label htmlFor="PW_input">PW</label>
            </div>
            <input
              id="PW_input"
              type="password"
              value={PW}
              onChange={(event) => setPW(event.target.value)}
              autoComplete="on"
            />
          </div>
        </form>
        <button onClick={LoginClick}>로그인</button>
      </div>
      <div className="otherBTN">
        <div className="otherBTN_Div1">
          <button className="otherLogin" onClick={kakaoClick}>
            <img
              alt="kakao Logo"
              className="IconLogo"
              src="/images/otherLogo/Kakao.png"
            />
          </button>
          <button className="otherLogin" onClick={googleClick}>
            <img
              alt="google Logo"
              className="IconLogo"
              src="/images/otherLogo/Google.png"
            />
          </button>
          <button className="otherLogin" onClick={naverClick}>
            <img
              alt="naver Logo"
              className="IconLogo"
              src="/images/otherLogo/Naver.png"
            />
          </button>
        </div>
        <div className="otherBTN_Div2">
          <button onClick={(event) => navigate("/auth/member/IDorPW")}>
            ID/PW 찾기
          </button>
          <div className="VLine"></div>
          <button onClick={(event) => navigate("/auth/member/SignUpChoice")}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
