import { /*useNavigate,*/ useLocation } from "react-router-dom";
import { useState, useRef } from "react";
//import axios from "axios";
import HeaderV2 from "../../components/header/HeaderV2";
import "../../CSS/market/MarketPost.css";
const MarketPost = () => {
  //const navigate = useNavigate();
  const location = useLocation();
  const [MarketImgFile, setMarketImgFile] = useState([]);
  const imgRef = useRef(null);
  //let tagArr = [];
  const [postInfo, setPostInfo] = useState({
    title: "",
    price: "",
    text: "",
    //tag: [],
  });
  const MarketImgUpload = async (event) => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (MarketImgFile.length < 10) {
        setMarketImgFile((prevFiles) => [...prevFiles, reader.result]);
      } else {
        alert("이미지는 최대 5개까지 업로드 가능합니다.");
      }
    };
  };
  /*
  const arrChange = (event) => {
    tagArr.push({ key: event.target.value });
    setPostInfo((prevPostInfo) => ({ ...prevPostInfo, tag: tagArr }));
  };*/
  const SavePost = async (event) => {
    event.preventDefault();
    console.log(postInfo);
    console.log(MarketImgFile);
    /*
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/", {
        //이미지
        
      })
      .then((response) => {
        if (response.data === true) {
          
        } else {
          console.log(response);
          alert("오류가 발생했습니다. 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생했습니다. 다시 시도해주세요");
      });
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/", {
        //게시글 올리기
        postInfo: postInfo,
      })
      .then((response) => {
        if (response.data === true) {
          alert("작성완료되었습니다.");
          navigate("/"); //메인페이지로 이동
        } else {
          console.log(response);
          alert("오류가 발생했습니다. 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생했습니다. 다시 시도해주세요");
      });*/
  };
  return (
    <div className="MarketPost">
      <HeaderV2 ID={location.state} />
      <div className="centerDiv">
        <div className="imgUploadMarket">
          <form>
            <label className="MarketIMGinput" htmlFor="marketPost">
              <img
                className="cameraIcon_Market"
                alt="cameraIcon"
                src="/images/Icon/cameraIcon.png"
              />
            </label>
            <input
              className="MarketIMGinput"
              ref={imgRef}
              type="file"
              accept="image/*"
              id="marketPost"
              onChange={(event) => MarketImgUpload(event)}
            />
          </form>
          {MarketImgFile.map((file, index) => (
            <div className="imgDiv" key={index}>
              <img className="MarketIMG" src={file} alt="MarketIMG" />
              <button
                className="imgDeleteButton"
                onClick={() =>
                  setMarketImgFile((prevFiles) =>
                    prevFiles.filter((_, i) => i !== index)
                  )
                }
              >
                X
              </button>
            </div>
          ))}
        </div>
        <div className="PostInfo">
          <div className="PostDetails">
            <label htmlFor="title">제목</label>
            <input
              id="title"
              type="text"
              name="title"
              value={postInfo.title}
              onChange={(event) =>
                setPostInfo((prevPostInfo) => ({
                  ...prevPostInfo,
                  title: event.target.value,
                }))
              }
            />
          </div>
          <div className="PostDetails">
            <label htmlFor="price">가격</label>
            ₩
            <input
              id="price"
              type="number"
              name="price"
              value={postInfo.price}
              onChange={(event) =>
                setPostInfo((prevPostInfo) => ({
                  ...prevPostInfo,
                  price: event.target.value,
                }))
              }
            />
          </div>
          <div className="PostDetails_textInput">
            <label htmlFor="text">설명</label>
            <textarea
              className="textInput"
              id="text"
              name="text"
              value={postInfo.text}
              onChange={(event) =>
                setPostInfo((prevPostInfo) => ({
                  ...prevPostInfo,
                  text: event.target.value,
                }))
              }
            />
          </div>
          {/*
          <div className="PostDetails">
          <label htmlFor="tag">태그</label>
          <input
            id="tag"
            type="text"
            name="tag"
            value={postInfo.tag}
            onChange={arrChange}
          />
          </div>*/}
        </div>
      </div>
      <button onClick={SavePost}>완료</button>
    </div>
  );
};
export default MarketPost;
