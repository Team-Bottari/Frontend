import { useState } from "react";
import { MdLocationSearching } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import "../../CSS/components/Header.css";
const HeaderV1 = (prop) => {
  const navigate = useNavigate();
  return (
    <div className="headerlayout">
      <div className="header">
        <div className="apptitle">
          <div className="gym">GYM</div>
          <div className="bott">BOTTARI</div>{" "}
        </div>
        <div className="search">
          {" "}
          <input className="searchbar" /> <button className="find">검색</button>
        </div>
      </div>{" "}
      <div className="usermenu">
        <div
          className="login"
          onClick={(event) => {
            console.log(prop.ID);
            navigate("/");
          }}
        >
          로그인
        </div>{" "}
        <div>|</div>
        <div
          className="register"
          onClick={(event) => {
            console.log(prop.ID);
            navigate("/Register");
          }}
        >
          회원가입
        </div>{" "}
      </div>
    </div>
  );
};
export default HeaderV1;
