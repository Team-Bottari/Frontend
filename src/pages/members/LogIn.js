import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "CSS/members/Login.css";
import axios from "axios";
import { useCookies } from "react-cookie";

const LogIn = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [accesstoken, setaccesstoken] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const LoginClick = async (event) => {
    event.preventDefault();
    //console.log(ID, PW);
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const formData = new URLSearchParams();
    formData.append("username", ID);
    formData.append("password", PW);

    try {
      const response = await axios.post(
        "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/login-token",
        formData,
        config
      );

      if (response) {
        setaccesstoken(response.data);
        console.log(response.data);
        setCookie("token", response.data.access_token, {
          path: "/",
        });
        // console.log(cookies);
        navigate("/", { state: ID });
      } else {
        console.log(response);
        alert("로그인에 실패했습니다!!!.");
      }
    } catch (err) {
      console.log(err);
      alert("로그인에 실패했습니다.");
    }
  };

  return (
    <div className="LogIn">
      <div className="Logo">
        <p className="top">GYM</p>
        <p>BOTTARI</p>
      </div>
      <div className="InputMaterial">
        <form>
          <div className="Input">
            <div className="InputLabel_Login">
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
            <div className="InputLabel_Login">
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
      </div>
      <div className="otherBTN">
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
      <button className="LogInBtn" onClick={LoginClick}>
        로그인
      </button>
    </div>
  );
};
export default LogIn;
