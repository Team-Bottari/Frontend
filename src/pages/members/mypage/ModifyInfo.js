import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import HeaderV1 from "../../../components/header/HeaderV1";
import "../../../CSS/mypage/ModifyInfo.css";
const ModifyInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(location.state);
  const [imgFile, setImgFile] = useState(location.state.img);
  const imgRef = useRef(null);
  const logOut = async (event) => {
    event.preventDefault();
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/logout", {
        id: userData.id,
      })
      .then((response) => {
        if (response.data.logout === true) {
          alert("로그아웃되었습니다.");
          navigate("/");
        } else {
          console.log(response);
          alert("오류가 발생하여 로그아웃에 실패했습니다. 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생하여 로그아웃에 실패했습니다. 다시 시도해주세요");
      });
  };
  const imgUpload = async (event) => {
    console.log(1);
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    console.log(2);
  };
  const SaveInfo = async (event) => {
    event.preventDefault();
    /*await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/", {//아직 api 없음
        
      })
      .then((response) => {
        if (response.data. === true) {
          
          navigate("/Mypage");
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
  const InfoPWReset = (event) => {
    navigate("/auth/mypage/PWConfirm");
  };
  const withdraw = (event) => {
    navigate("/auth/mypage/Withdraw");
  };
  return (
    <div className="ModifyInfo">
      <HeaderV1 />
      <div className="leftDiv">
        <img className="useImg" key={imgFile} src={imgFile} alt="userIMG" />
        <form>
          <label className="input-file-button" htmlFor="user">
            <img
              className="cameraIcon"
              alt="cameraIcon"
              src="/images/Icon/cameraIcon.png"
            />
          </label>
          <input
            className="imgInput"
            ref={imgRef}
            type="file"
            accept="image/*"
            id="user"
            onChange={(event) => imgUpload(event)}
          />
        </form>
        <div className="InputNickname">
          <div className="InputLabelNickname">
            <label htmlFor="Nickname_input">닉네임</label>
          </div>
          <input
            id="Nickname_input"
            type="text"
            name="Name"
            value={userData.name}
            onChange={(event) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                name: event.target.value,
              }))
            }
          />
        </div>
      </div>
      <div className="right">
        <div className="ModifyDiv">
          <p className="PLable">Email</p>
          <p className="PEmail">{userData.id}</p>
        </div>
        <div className="ModifyDiv">
          <p className="PLable">PW</p>
          <button className="PWReset" onClick={InfoPWReset}>
            재설정
          </button>
        </div>
        <button className="Logout" onClick={logOut}>
          로그아웃
        </button>
        <button className="SaveInfo" onClick={SaveInfo}>
          완료
        </button>
      </div>
      <button className="withdraw" onClick={withdraw}>
        탈퇴하기
      </button>
    </div>
  );
};
export default ModifyInfo;
