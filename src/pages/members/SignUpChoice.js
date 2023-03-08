import { useNavigate } from "react-router-dom";
import "../../CSS/members/IDorPW.css";
import "../../CSS/members/Login.css";
const SignUpChoice = () => {
  const navigate = useNavigate();
  const kakao = (event) => {};
  const naver = (event) => {};
  const google = (event) => {};
  return (
    <div className="SignUpChoice">
      <div className="Logo">
        <img alt="main Logo" className="LogoIMG" src="/images/LogoWhite.png" />
      </div>
      <div className="Button">
        <button onClick={kakao}>카카오로 시작하기</button>
        <button onClick={naver}>네이버로 시작하기</button>
        <button onClick={google}>구글로 시작하기</button>
        <button
          onClick={(e) => {
            navigate("/auth/member/SignUp_1");
          }}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
export default SignUpChoice;
