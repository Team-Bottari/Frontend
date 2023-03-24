import { useLocation } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import { useState, useEffect, useRef } from "react";
const MarketInfo = (props) => {
  const location = useLocation();
  const [marketPostInfo, setMarketPostInfo] = useState({
    title: "",
    price: "",
    text: "",
  });
  const [userData, setUserData] = useState({
    id: props.id,
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
          "http://wisixicidi.iptime.org:30000/", 
          {
            id: location.state,
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
            id: location.state,
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
    <div>
      {
        //<HeaderV1 ID={location.state} />
      }
      <img alt="postImg" className="postImg" src={marketPostImg} />
      <p>{userData.name}</p>
      <p>{userData.credit_rating}</p>
      <div>
        {marketPostInfo.title}
        {marketPostInfo.price}
        {marketPostInfo.text}
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
