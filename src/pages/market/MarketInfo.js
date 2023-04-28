import { useNavigate, useLocation } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import { useState, useEffect, useRef } from "react";
import "../../CSS/market/MarketInfo.css";
const MarketInfo = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [marketPostInfo, setMarketPostInfo] = useState({
    title: "기본제목",
    price: 100,
    text: "기본내용 기본내용 기본내용 기본내용 기본내용 기본내용 기본내용",
    discountCheck: false,
    category: "기본카테고리",
    status: true, //팔린 상품이면 false
  });
  const [marketInfoImgFile, setMarketInfoImgFile] = useState([
    "/images/LogoWhite.png",
    "/images/LogoPurple.png",
    "/images/otherLogo/Google.png",
    "/images/otherLogo/Kakao.png",
    "/images/otherLogo/Naver.png",
  ]);
  const [imgIndex, setImgIndex] = useState(0);
  const [starIMG, setstarIMG] = useState(false);
  const [userData, setUserData] = useState({
    /*id: props.id, //console 확인 후 email인지 id인지 판별
    name: props.name,
    credit_rating: props.weight,*/
    id: props.id, //console 확인 후 email인지 id인지 판별
    name: "홍길동",
    credit_rating: 10,
    img: "/images/Icon/userIcon.png",
  });
  const imgRef = useRef(null);

  const ClickMinus = (event) => {
    if (imgIndex !== 0) {
      setImgIndex(imgIndex - 1);
    }
    setMarketInfoImgFile((prev) => {
      const copy = [...prev];
      return copy;
    });
  };
  const ClickPlus = (event) => {
    if (imgIndex !== marketInfoImgFile.length - 1) {
      setImgIndex(imgIndex + 1);
    }
    setMarketInfoImgFile((prev) => {
      const copy = [...prev];
      return copy;
    });
  };
  const starClick = (event) => {
    if (marketPostInfo.status === true) {
      setstarIMG(!starIMG);
      //!starIMG 상태에 따라서 관심목록에 추가 및 삭제하는 메소드 만들기
    } else {
      alert("판매완료된 상품은 관심목록에 추가할 수 없습니다.");
    }
  };

  const ClickChat = (event) => {
    if (marketPostInfo.status === true) {
      navigate("Chat");
    } else {
      alert("판매완료된 상품은 채팅 할 수 없습니다.");
    }
  };

  useEffect(() => {
    let posting_id = 0;
    let imageNum = 0;
    /*    
    async function getUserIMG() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/profile/미니",
          {
            email: userData.id,
          },
          { responseType: "arraybuffer" }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });
        const imgURL = URL.createObjectURL(blob)
        setUserData({...userData,img: imgURL});
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getUserIMG();
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
        posting_id = response.data.posting_id;
        imageNum = response.data.imageNum;
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getPostInfo();
    async function getPostIMG() {
      try {
        for(let index =1; index < imageNum ; index++){
          const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/images/{posting_id}/{index}/standard",
          {
            email: location.state,
          },
          { responseType: "arraybuffer" }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setMarketInfoImgFile((prevFiles) => [...prevFiles, URL.createObjectURL(blob)])
        }
        
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getPostIMG();*/
  }, [location.state]);
  return (
    <div className="MarketInfo">
      <HeaderV1 ID={location.state} />
      <div className="InfoBody_left">
        {/*marketInfoImgFile.map((file, index) => (
          <div className="imgDiv" key={index}>
            <img className="MarketInfoIMG" src={file} alt="MarketIMG" />
          </div>
        ))*/}
        {marketPostInfo.status === false && (
          <div className="StatusFalse">
            <p>판매완료</p>
          </div>
        )}
        <button className="ClickMinus" onClick={ClickMinus}>
          〈
        </button>{" "}
        <img
          alt="MarketInfoIMG"
          className="MarketInfoIMG"
          src={marketInfoImgFile[imgIndex]}
        />
        <button className="ClickPlus" onClick={ClickPlus}>
          〉
        </button>
      </div>

      <div className="InfoBody_right">
        <div className="userD">
          <img alt="userImgMini" className="userImgMini" src={userData.img} />
          <p className="userName">{userData.name}</p>
          <div className="userDRight">
            <img
              alt="userIconWeight"
              className="userIconWeight"
              src="/images/Icon/weightIcon.png"
            />
            <p> {userData.credit_rating} KG</p>
          </div>
        </div>
        <div className="postingInfo">
          <p className="postingInfotitle">{marketPostInfo.title}</p>
          <p className="postingInfoprice">{marketPostInfo.price}원</p>
          <p className="postingInfotext">{marketPostInfo.text}</p>
          <div className="postingInfocategory">
            {marketPostInfo.discountCheck === false && <p>#네고불가능</p>}
            {marketPostInfo.discountCheck === true && <p>#네고가능</p>}
            <p>#{marketPostInfo.category}</p>
          </div>
        </div>
        <div className="InfoButton">
          {starIMG === false && (
            <button className="InfoButtonStar" onClick={starClick}>
              <img
                alt="BlankStar"
                className="starIMG"
                src="/images/Icon/starIcon.png"
              />
            </button>
          )}
          {starIMG === true && (
            <button className="InfoButtonStar" onClick={starClick}>
              <img
                alt="fullStar"
                className="starIMG"
                src="/images/Icon/fullStarIcon.png"
              />
            </button>
          )}
          <button className="InfoButtonChat" onClick={ClickChat}>
            채팅
          </button>
          <button className="InfoButtonReport">신고</button>
        </div>
      </div>
    </div>
  );
}; //마켓게시글
export default MarketInfo;
