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
          <button
            className="goTomain"
            onClick={(event) => {
              console.log(prop.ID);
              navigate("/", { state: prop.ID });
            }}
          ></button>
          <div className="gym">GYM</div>
          <div className="bott">BOTTARI</div>{" "}
        </div>
        <div className="search">
          {" "}
          <input className="searchbar" /> <button className="find">검색</button>
        </div>
      </div>{" "}
      <div className="usermenu">
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
    </div>
  );
};
export default HeaderV1;
