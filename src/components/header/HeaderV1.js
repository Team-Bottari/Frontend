import { useState } from "react";
import { MdLocationSearching } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import "../../CSS/components/Header.css";
const HeaderV1 = (prop) => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState("");
  return (
    <div className="header">
      <div className="headerLeft">
        {" "}
        <div>GYM</div>
        <div className="headerLogo">Bottari</div>
        <div className="br"></div>
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
            className="searchbtn"
            onClick={(event) => {
              console.log(searchWord, "검색");
            }}
          >
            <BiSearch className="HeaderIconSearch" color=" #4053FF" size="20" />
          </button>
        </div>
      </div>

      <div className="headerRight">
        <div className="br"></div>
        <button
          className="MenuHeader"
          onClick={(event) => {
            console.log("위치");
          }}
        >
          <MdLocationSearching
            className="HeaderIcon_right"
            color=" #4053FF"
            size="30"
          />
          <div className="text">위치</div>
        </button>
        <button
          className="MenuHeader"
          onClick={(event) => {
            console.log(prop.ID);
            navigate("/Mypage", { state: prop.ID });
          }}
        >
          <BsFillPersonFill
            className="HeaderIcon_right"
            color="#3342c3"
            size="30"
          />
          <div className="text">내 정보</div>
        </button>{" "}
        <button
          className="MenuHeader"
          onClick={(event) => {
            console.log("메뉴");
          }}
        >
          <AiOutlineMenuUnfold
            className="HeaderIcon"
            color=" #3342c3"
            size="30"
          />
          <div className="text">메뉴</div>{" "}
        </button>
      </div>
    </div>
  );
};
export default HeaderV1;
