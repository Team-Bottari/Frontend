import React from "react";
import Itemcomp from "components/members/itemcomponent";
import "CSS/mypage/Purchase.css";

import { useState } from "react";
import axios from "axios";
import { GiWeightLiftingUp } from "react-icons/gi";
import HeaderV1 from "components/header/HeaderV1";
const History = ({ pagename, dummy }) => {
  /*const [profileimg, setprofileimg] = useState("");
   axios.post("url").then((response) => {
   setprofileimg(response.data);
  });
  console.log(profileimg)*/ //프로필이미지 가져오기
  return (
    <div>
      <HeaderV1 className="header1"></HeaderV1>
      <div className="top">
        <div className="bigcontainer">
          <div className="inform">
            <img
              src="https://postfiles.pstatic.net/MjAyMzA4MDNfMjgy/MDAxNjkxMDQxNDQ2Nzk4.jh02R0qMZnMhZcsX5umWc-9DoNNSDULrERTU8k8JcQEg.yg_c8Ca48KTLPmgQN1ORA7Osln-nwWPsQ4elrB4d58cg.JPEG.soyeon1056/KakaoTalk_20230716_164222066.jpg?type=w773"
              alt="프로필사진"
              className="myinform"
            />
            <div className="userinform">
              <div className="name"> 홍길동님 </div>
              <div className="weight">
                <GiWeightLiftingUp></GiWeightLiftingUp> 120kg{" "}
              </div>
            </div>
          </div>
          <div className="pagename">{pagename}</div>
          <div className="item-grid">
            {dummy.item.map((item, index) => (
              <Itemcomp key={index} imgUrl={item.URL} type="purchase" />
            ))}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};
export default History;
