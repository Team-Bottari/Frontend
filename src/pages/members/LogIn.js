import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../CSS/Login.css";
import axios from "axios";
const LogIn = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState();
  const [PW, setPW] = useState();

  const LoginClick = async (event) => {
    event.preventDefault();
    await axios
      .post("", {
        id: ID,
        pw: PW,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        alert("로그인에 실패했습니다.");
      });
  };
  const kakaoClick = async (event) => {
    event.preventDefault();
  };
  const googleClick = async (event) => {
    event.preventDefault();
  };
  const naverClick = async (event) => {
    event.preventDefault();
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
              <lable for="ID_input">Email</lable>
            </div>
            <input
              id="ID_input"
              type="email"
              value={ID}
              onChange={(event) => setID(event.targt.value)}
            />
          </div>
          <br />
          <div className="Input">
            <div className="InputLabel">
              <lable for="PW_input" className="InputLabel">
                PW
              </lable>
            </div>
            <input
              id="PW_input"
              type="password"
              value={PW}
              onChange={(event) => setPW(event.targt.value)}
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
          <button className="findIDPW" onClick={(event) => navigate("/IDorPW")}>
            ID/PW 찾기
          </button>
          <div className="VLine"></div>
          <button className="Signup" onClick={(event) => navigate("/SignUp_1")}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
