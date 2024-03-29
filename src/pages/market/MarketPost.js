import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import HeaderV2 from "components/header/HeaderV2";
import "CSS/market/MarketPost.css";

/** 컴포넌트 쪼개기**/

const MarketPost = (propsFromM) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [MarketImgFile, setMarketImgFile] = useState(propsFromM.marketImgFile);
  const status = propsFromM.status;
  const imgRef = useRef(null);
  const [postInfo, setPostInfo] = useState(propsFromM.marketInfo);
  const MarketImgUpload = async (event) => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (MarketImgFile.length < 10) {
        setMarketImgFile((prevFiles) => [...prevFiles, reader.result]);
      } else {
        alert("이미지는 최대 10개까지 업로드 가능합니다.");
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
    if (status === "작성") {
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
            console.log("포스팅 번호:", response.data.posting_id);
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
              console.log("이미지BLOB:", blob);
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
                  //console.log(response);
                  for (let [key, value] of IMGformData.entries()) {
                    console.log("전송 부분 콘솔 ", key, value);
                  }
                  if (response.data.response === 200) {
                    if (imageID === MarketImgFile.length - 1) {
                      alert("작성 완료되었습니다.");
                      navigate("/", { state: location.state }); //메인페이지로 이동
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
          alert(
            `게시물 업로드 중 서버 오류가 발생했습니다. 다시 시도해주세요.`
          );
        });
    } else if (status === "수정") {
      console.log(postInfo);
      await axios
        .put(
          `http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/${postInfo.posting_id}`,
          {
            member_id_check: {
              member_id: postInfo.member_id.toString(),
            },
            new_posting: {
              title: postInfo.title,
              content: postInfo.text,
              price: parseInt(postInfo.price),
              category: postInfo.category,
              can_discount: postInfo.discountCheck,
            },
          }
        )
        .then((response) => {
          //console.log("포스팅 수정 결과:", response);
          if (response.data.response === "수정 완료") {
            for (let imageID = 0; imageID < MarketImgFile.length; imageID++) {
              const IMGformData = new FormData();
              if (MarketImgFile[imageID].slice(0, 4) === "data") {
                //새로 추가한 사진이었을때.
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
                  `PostID:${postInfo.posting_id}image${
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
                console.log(imageID, blob);
                IMGformData.append("files", blob, file.name);
              } else {
                //기존 존재하던 사진이었을 때
                const fileName = MarketImgFile[imageID];
                const fileExtension = fileName.type; //파일 확장자명 가져오기
                let fileExtensionName = fileExtension.substr(
                  fileExtension.indexOf("/") + 1,
                  fileExtension.length + 1
                );
                const file = new File(
                  [MarketImgFile[imageID]],
                  `PostID:${postInfo.posting_id}image${
                    imageID + 1
                  }.${fileExtensionName}`, //파일명
                  { type: `${fileExtension}` } //파일 타입 - image/jpeg또는 image/png
                );
                const blob = MarketImgFile[imageID];
                console.log(imageID, MarketImgFile[imageID]);
                IMGformData.append("files", blob, file.name);
              }
              for (let [key, value] of IMGformData.entries()) {
                console.log(key, value);
              }
              axios
                .post(
                  `http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/images/${
                    postInfo.posting_id
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
                  if (response.data.response === 200) {
                    for (let [key, value] of IMGformData.entries()) {
                      console.log("전송 부분 콘솔 ", key, value);
                    }
                    if (imageID === MarketImgFile.length - 1) {
                      alert("작성 완료되었습니다.");
                      navigate("/Mypage", { state: "user@example.com" }); //메인페이지로 이동
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
          alert(
            `게시물 업로드 중 서버 오류가 발생했습니다. 다시 시도해주세요.`
          );
        });
    }
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
              {file.type === "image/jpeg" && (
                <img
                  className="MarketIMG"
                  src={URL.createObjectURL(file)}
                  alt="MarketIMG"
                />
              )}
              {file.type !== "사진 XboX 방지용" && (
                <img className="MarketIMG" src={file} alt="MarketIMG" />
              )}
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
          <div className="PostDetails"></div>
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
MarketPost.defaultProps = {
  marketInfo: {
    title: "",
    price: 0,
    text: "",
    discountCheck: false,
    category: "",
    member_id: "",
    posting_id: 0,
    email: "",
    status: true,
    like: 0,
  },
  marketImgFile: [],
  status: "작성",
};
export default MarketPost;
