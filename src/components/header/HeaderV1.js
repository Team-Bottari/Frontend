import "../../CSS/components/Header.css";
const HeaderV1 = () => {
  return (
    <div className="header">
      <div className="headerLeft">
        <button className="MenuHeader">Menu버튼</button>
        <img
          alt="headerLogo"
          className="headerLogo_center"
          src="/images/LogoPurple.png"
        />
      </div>
      <div className="headerCenter">
        <input placeholder="검색창" />
      </div>
      <div className="headerRight">
        <button className="MypageHeader">위치지정</button>
        <button className="MypageHeader">Mypage버튼</button>
      </div>
    </div>
  );
};
export default HeaderV1;
