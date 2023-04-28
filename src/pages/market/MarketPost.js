import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import HeaderV2 from "../../components/header/HeaderV2";
import "../../CSS/market/MarketPost.css";
const MarketPost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [MarketImgFile, setMarketImgFile] = useState([]);
  const imgRef = useRef(null);
  const [postInfo, setPostInfo] = useState({
    title: "",
    price: "",
    text: "",
    discountCheck: false,
    category: "",
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
  const discountCheckEvent = (event) => {
    if (event.target.checked === true) {
      setPostInfo((prevPostInfo) => ({
        ...prevPostInfo,
        discountCheck: true,
      }));
    } else {
      setPostInfo((prevPostInfo) => ({
        ...prevPostInfo,
        discountCheck: false,
      }));
    }
  };
  const SavePost = async (event) => {
    event.preventDefault();
    console.log(
      postInfo.title,
      " / ",
      postInfo.text,
      " / ",
      postInfo.price,
      " / ",
      location.state,
      " / ",
      postInfo.category,
      " / ",
      postInfo.discountCheck
    );

    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/posting", {
        //게시글 올리기
        title: postInfo.title,
        content: postInfo.text,
        price: postInfo.price,
        category: postInfo.category,
        email: location.state,
        can_discount: postInfo.discountCheck,
      })
      .then((response) => {
        if (response.data.response === 200) {
          for (let imageID = 0; imageID < MarketImgFile.length; imageID++) {
            const fileName = MarketImgFile[imageID];
            const fileExtension = fileName.substr(
              fileName.indexOf(":") + 1,
              fileName.indexOf(";") - fileName.indexOf(":") - 1
            ); //파일 확장자명 가져오기
            let fileExtensionName = fileExtension.substr(
              fileExtension.indexOf("/") + 1,
              fileExtension.length + 1
            );
            const file = new File(
              [MarketImgFile[imageID]],
              `PostID:${response.data.posting_id}image${
                imageID + 1
              }.${fileExtensionName}`, //파일명
              { type: `${fileExtension}` } //파일 타입 - image/jpeg또는 image/png
            );
            const base64String = MarketImgFile[imageID].replace(
              /^data:\w+\/\w+;base64,/,
              ""
            );
            const blob = new Blob(
              [
                new Uint8Array(
                  atob(base64String)
                    .split("")
                    .map((char) => char.charCodeAt(0))
                ),
              ],
              { type: fileExtension }
            );
            console.log(blob);
            const IMGformData = new FormData();
            IMGformData.append("files", blob, file.name);
            axios
              .post(
                `http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/images/${
                  response.data.posting_id
                }/${imageID + 1}/upload`,
                IMGformData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                  },
                }
              )
              .then((response) => {
                console.log(response);
                if (response.data.response === 200) {
                  if (imageID === MarketImgFile.length - 1) {
                    alert("작성 완료되었습니다.");
                    navigate("/Mypage", { state: location.state }); //메인페이지로 이동
                  }
                } else {
                  console.log(response);
                  alert(
                    `${imageID}번째 사진 업로드 중 오류가 발생했습니다. 다시 시도해주세요`
                  );
                }
              })
              .catch((err) => {
                console.log(err);
                alert(
                  "사진 업로드 중 서버 오류가 발생했습니다. 다시 시도해주세요."
                );
              });
          }
        } else {
          console.log(response);
          alert("게시물 업로드 중 오류가 발생했습니다. 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert(`게시물 업로드 중 서버 오류가 발생했습니다. 다시 시도해주세요.`);
      });
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
          <div className="PostDetails">
            {/*카테고리 현재는 string값. 추후 카테고리 고정되면 select 박스 생성, 여러번 선택 가능하게 하고 선택할때마다 
            카테고리 str 값을 추가, concat해서 합쳐서 서버로 보내기*/}
            <label htmlFor="text">카테고리</label>
            <input
              className="textInput"
              id="text"
              name="text"
              value={postInfo.category}
              onChange={(event) =>
                setPostInfo((prevPostInfo) => ({
                  ...prevPostInfo,
                  category: event.target.value,
                }))
              }
            />
          </div>
          <div className="PostDetailsCheckBox">
            <label htmlFor="tag">네고 가능</label>
            <input
              id="discount"
              type="checkbox"
              name="discount"
              value={postInfo.discountCheck}
              onChange={discountCheckEvent}
            />
          </div>
          <button className="completeButton" onClick={SavePost}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
};
export default MarketPost;
