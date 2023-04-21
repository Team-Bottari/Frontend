import { useLocation } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import { useState, useEffect, useRef } from "react";
import "../../CSS/market/MarketInfo.css";
const MarketInfo = (props) => {
  const location = useLocation();
  const [marketPostInfo, setMarketPostInfo] = useState({
    title: "기본제목",
    price: "0",
    text: "기본내용",
    discountCheck: false,
    category: "",
  });
  const [marketInfoImgFile, setMarketInfoImgFile] = useState([]);
  const [userData, setUserData] = useState({
    id: props.id, //console 확인 후 email인지 id인지 판별
    name: props.name,
    credit_rating: props.weight,
  });
  const [marketPostImg, setMarketPostImg] = useState([]);
  const imgRef = useRef(null);

  useEffect(() => {
    /*
    async function getPostInfo() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/{posting_id}", 
          {
            email: location.state,
          }
        );
        console.log(response);
        setMarketPostInfo(response.data);
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getPostInfo();
    async function getPostIMG() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/",
          {
            email: location.state,
          },
          { responseType: "arraybuffer" }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setMarketPostImg(URL.createObjectURL(blob));
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getPostIMG();*/
  }, [location.state]);

  return (
    <div className="MarketInfo">
      {
        //<HeaderV1 ID={location.state} />
      }
      {
        //       <img alt="postImg" className="postImg" src={marketPostImg} /> //이미지 한개씩인지 여러개 한번에인지 따라서 달라짐.
      }
      <p>{userData.name}</p>
      <p>{userData.credit_rating}</p>
      <div className="InfoBody_right">
        {marketPostInfo.title}
        <br />
        {marketPostInfo.price}원
        <br />
        {marketPostInfo.text}
        <br />
      </div>
      <div>
        <button>star</button>
        <button>채팅</button>
        <button>신고하기</button>
      </div>
    </div>
  );
}; //마켓게시글
export default MarketInfo;
