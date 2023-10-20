import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { useEffect } from "react";
import Market from "../../pages/market/Market";

import "CSS/market/Marketmain.css";
//파라미터로 posting-id 보내기 marketinfo 로
import "CSS/market/Marketmain.css";
export const Product = ({ item, className, url }) => {
  // 이미지 인덱스로 이미지 가져오기
  const navigate = useNavigate();

  const [id, setid] = useState("");
  const posting = (id) => {
    navigate(`/MarketInfo/${id}`);
  };
  const [liked, setLiked] = useState(false);

  const likebutton = () => {
    /* axios.post("http://wisixicidi.iptime.org:30000/api/v1.0.0/like", {
       posting_id: "EWkSD4kBg4HIUcUDUlsn",
       member_id: 2,
     });*/
    setLiked(!liked);
    console.log("좋아요 버튼 클릭");
  };
  /*const cancel_like = () => {
     axios.put("http://wisixicidi.iptime.org:30000/api/v1.0.0/like", {
       posting_id: "EWkSD4kBg4HIUcUDUlsn",
    member_id: 2,
    });
   console.log("좋아요 버튼 취소");
   };*/
  return (
    <div className="product">
      <div className="itemimg">
        <img className="_img" src={item.url} alt="Product Image" />
      </div>{" "}
      <div className="iteminform">
        <div className="itemtext">
          <div>
            <span className="title">{item.title}</span>
          </div>
          <div>
            <span className="price">{item.id}원</span>
          </div>{" "}
        </div>{" "}
        <button className="likebtn" onClick={(e) => likebutton(e)}>
          {!liked ? (
            <AiFillHeart className="heart" color="red"></AiFillHeart>
          ) : (
            <AiOutlineHeart className="heart" color="black"></AiOutlineHeart>
          )}
        </button>
      </div>
    </div>
  );
};
