import { useNavigate, useLocation } from "react-router-dom";
import HeaderV1 from "components/header/HeaderV1";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "CSS/market/MarketInfo.css";

/*if 내 제작페이지면 수정 버튼 보이게 해주기, 그리고 수정버튼 누르면 state로 postInfo 보내주기 */
const MarketInfo = (postingID_Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const postID = postingID_Props.postingID;
  const [marketPostInfo, setMarketPostInfo] = useState({
    member_id: "",
    email: "",
    posting_id: 0,
    title: "기본제목",
    price: 100,
    text: "기본내용 기본내용 기본내용 기본내용 기본내용 기본내용 기본내용",
    discountCheck: false,
    category: "기본카테고리",
    status: true, //팔린 상품이면 false
    like: 0,
  });
  const [marketInfoImgFile, setMarketInfoImgFile] = useState([]);
  const [imgBlob, setImgBlob] = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [starIMG, setstarIMG] = useState(false);
  const [userData, setUserData] = useState({
    id: "skarod0401@gmail.com", //console 확인 후 email인지 id인지 판별
    name: "홍길동",
    credit_rating: 10,
    img: "/images/Icon/userIcon.png",
  });

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
  const starClick = async (event) => {
    if (marketPostInfo.status === true) {
      event.preventDefault();
      setstarIMG(!starIMG);
      console.log("관심 클릭", starIMG);
      if (starIMG === true) {
        await axios
          .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/like", {
            posting_id: marketPostInfo.posting_id,
            member_id: marketPostInfo.member_id,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
            alert("오류가 발생했습니다.");
          });
      } else if (starIMG === false) {
        await axios
          .put("http://wisixicidi.iptime.org:30000/api/v1.0.0/like", {
            posting_id: marketPostInfo.posting_id,
            member_id: marketPostInfo.member_id,
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);
            alert("오류가 발생했습니다.");
          });
      }
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
    let userEmail = "";
    async function getPostInfo() {
      try {
        const response = await axios.post(
          `http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/${postID}`,
          {
            member_id: "7",
          }
        );
        posting_id = response.data.posting.posting_id;
        imageNum = response.data.posting.posting_images.length;
        userEmail = response.data.posting.email;
        console.log(response.data.posting.posting_images.length);
        setMarketPostInfo((prevUserData) => ({
          ...prevUserData,
          email: response.data.posting.email,
          member_id: response.data.posting.member_id,
          posting_id: response.data.posting.posting_id,
          title: response.data.posting.title,
          price: response.data.posting.price,
          text: response.data.posting.content,
          discountCheck: response.data.posting.can_discount,
          category: response.data.posting.category,
          status: !response.data.posting.sold_out,
          like: response.data.posting.like,
        }));
        if (response.status === 200) {
          try {
            const response = axios.post(
              "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/profile/mini",
              {
                email: userEmail,
              },
              { responseType: "arraybuffer" }
            );
            response.then((result) => {
              const blob = new Blob([result.data], { type: "image/jpeg" });
              const imgURL = URL.createObjectURL(blob);
              setUserData({ ...userData, img: imgURL });
            });
          } catch (err) {
            console.log(err);
            alert("오류가 발생했습니다");
          }
          try {
            const response = axios.post(
              "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/info",
              {
                email: userEmail,
              }
            );
            response.then((result) => {
              setUserData({
                ...userData,
                name: result.data.nick_name,
                credit_rating: result.data.credit_rating,
              });
            });
          } catch (err) {
            console.log(err);
            alert("오류가 발생했습니다");
          }
          try {
            const imageFiles = [];
            const blobFiles = [];
            for (let index = 1; index <= imageNum; index++) {
              const response = await axios.post(
                `http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/images/${postID}/${index}/standard`,
                {},
                { responseType: "arraybuffer" }
              );
              const blob = new Blob([response.data], { type: "image/jpeg" });
              blobFiles.push(blob);
              imageFiles.push(URL.createObjectURL(blob));
            }
            setImgBlob(blobFiles);
            setMarketInfoImgFile(imageFiles);
          } catch (err) {
            console.log(err);
            alert("오류가 발생했습니다");
          }
        }
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getPostInfo();
  }, [location.state]);
  return (
    <div className="MarketInfo">
      <HeaderV1 ID={location.state} />
      <div className="InfoBody_left">
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
        <button
          onClick={(e) => {
            navigate("/auth/market/MarketModify", {
              state: { data: marketPostInfo, image: imgBlob },
            });
          }}
        >
          임시 수정 버튼
        </button>
      </div>
    </div>
  );
}; //마켓게시글
MarketInfo.defaultProps = {
  postingID: "",
};
export default MarketInfo;
