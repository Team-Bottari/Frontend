import "../../CSS/components/Header.css";
import { useNavigate } from "react-router-dom";
const HeaderV1 = (prop) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <button
        className="MenuHeader"
        onClick={(event) => {
          console.log("메뉴");
        }}
      >
        <img
          alt="Menu Logo"
          className="HeaderIcon"
          src="/images/Icon/menuIcon.png"
        />
      </button>
      <div className="headerCenter">
        <div className="headerLogo">
          <img
            alt="headerLogo"
            className="headerLogo"
            src="/images/LogoPurple.png"
          />
        </div>
      </div>

      <div className="headerRight">
        <button
          className="MenuHeader"
          onClick={(event) => {
            console.log(prop.ID);
            navigate("/Mypage", { state: prop.ID });
          }}
        >
          <img
            alt="Menu Logo"
            className="HeaderIcon_right"
            src="/images/Icon/userIcon.png"
          />
        </button>
      </div>
    </div>
  );
};
export default HeaderV1;
