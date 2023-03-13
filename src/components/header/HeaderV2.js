import "../../CSS/components/Header.css";
const HeaderV1 = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <button className="MenuHeader">Menu버튼</button>
      </div>
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
        <button className="MypageHeader">Mypage버튼</button>
      </div>
    </div>
  );
};
export default HeaderV1;
