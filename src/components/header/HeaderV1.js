import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/components/Header.css";
const HeaderV1 = (prop) => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  return (
    <div className="header">
      <div className="headerLeft">
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
        <img
          alt="headerLogo"
          className="headerLogo"
          src="/images/LogoPurple.png"
        />
      </div>
      <div className="headerCenter">
        <div className="SearchLabel">
          <label htmlFor="Search_input">
            <input
              id="Search_input"
              type="text"
              name="searchWord"
              value={searchWord}
              onChange={(event) => setSearchWord(event.target.value)}
              placeholder="검색어를 입력하세요"
            />
          </label>{" "}
          <button
            className="MenuHeader"
            onClick={(event) => {
              console.log(searchWord, "검색");
            }}
          >
            <img
              alt="Menu Logo"
              className="HeaderIconSearch"
              src="/images/Icon/searchIcon.png"
            />
          </button>
        </div>
      </div>

      <div className="headerRight">
        <button
          className="MenuHeader"
          onClick={(event) => {
            console.log("위치");
          }}
        >
          <img
            alt="Menu Logo"
            className="HeaderIcon_right"
            src="/images/Icon/locationIcon.png"
          />
        </button>
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
