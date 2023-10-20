import React from "react";
import "CSS/mypage/Purchase.css";

const Itemcomp = ({ imgUrl, name, type }) => {
  if (type === "purchase") {
    return (
      <div>
        <div className="itemlist1">
          <div>
            <img className="itemsize" src={imgUrl} />
            <div className="purchased"> 판매 완료</div>
          </div>

          <div className="iteminform">
            <div className="inform1">
              <div className="itemname">상품명</div>
              <div className="price">10000원</div>
            </div>
            <div className="inform2">
              <div>?분전</div>
              <div>00동</div>
            </div>
          </div>
        </div>{" "}
        <div>{name} </div>
      </div>
    );
  } else {
    return <div>hello </div>;
  }
};
export default Itemcomp;
