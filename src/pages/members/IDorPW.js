import { useNavigate } from "react-router-dom";
import "../../CSS/members/IDorPW.css";
import "../../CSS/members/Login.css";
const IDorPW = () => {
  console.log("sdsd");
  const navigate = useNavigate();
  return (
    <div className="IDorPW">
      <div className="Logo">
        <img alt="main Logo" className="LogoIMG" src="/images/LogoWhite.png" />
      </div>
      <div className="Button">
        <button
          onClick={(e) => {
            navigate("/auth/member/IDSearch");
          }}
        >
          ID 찾기
        </button>
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
