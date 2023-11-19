import { useNavigate } from "react-router-dom";
import "CSS/members/IDorPW.css";
import "CSS/members/Login.css";
const IDorPW = () => {
  const navigate = useNavigate();
  return (
    <div className="IDorPW">
      <div className="Logo">
        <p className="top">GYM</p>
        <p>BOTTARI</p>
      </div>
      <div className="IDorPWButton">
        <button
          onClick={(e) => {
            navigate("/auth/member/IDSearch");
          }}
        >
          ID 찾기
        </button>
        <div className="IDorPWVLine"></div>
        <button
          onClick={(e) => {
            navigate("/auth/member/PWReset");
          }}
        >
          PW 재설정
        </button>
      </div>
    </div>
  );
};
export default IDorPW;
