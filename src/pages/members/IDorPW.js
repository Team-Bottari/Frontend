import { useNavigate } from "react-router-dom";
import "../../CSS/members/IDorPW.css";
import "../../CSS/members/Login.css";
const IDorPW = () => {
  const navigate = useNavigate();
  return (
    <div className="IDorPW">
      <div className="Logo">
        <img alt="main Logo" className="LogoIMG" src="/images/LogoWhite.png" />
      </div>
      <div className="Button">
        <button
          onClick={(e) => {
            navigate("/auth/IDSearch");
          }}
        >
          ID 찾기
        </button>
        <button
          onClick={(e) => {
            navigate("/auth/PWReset");
          }}
        >
          PW 재설정
        </button>
      </div>
    </div>
  );
};
export default IDorPW;
