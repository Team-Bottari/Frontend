import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import HeaderV2 from "../../../components/header/HeaderV2";
import "../../../CSS/mypage/ModifyInfo.css";
const ModifyInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(location.state);
  const IDJSon = { email: userData.email };
  const [flag, setFlag] = useState(false);
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef(null);
  useEffect(() => {
    /*console.log(location.state.email)*/
    async function getUserIMG() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/profile/standard",
          {
            email: location.state.email,
          },
          { responseType: "arraybuffer" }
        );
        console.log(response);
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setImgFile(URL.createObjectURL(blob));
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    getUserIMG();
  }, [location.state]);

  const logOut = async (event) => {
    event.preventDefault();
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/logout", {
        email: userData.email,
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
  const deleteIMG = async (event) => {
    if (flag === false) {
      event.preventDefault();
      await axios
        .post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/profile/delete",
          {
            email: userData.email,
          },
          { responseType: "arraybuffer" }
        )
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            const blob = new Blob([response.data], { type: "image/jpeg" });
            setImgFile(URL.createObjectURL(blob));
            setFlag(true);
            console.log("이미지 삭제");
          } else {
            console.log(response);
            alert(
              "오류가 발생하여 이미지 삭제에 실패했습니다. 다시 시도해주세요"
            );
          }
        })
        .catch((err) => {
          console.log(err);
          alert("오류가 발생하여 삭제에 실패했습니다. 다시 시도해주세요");
        });
    }
  };
  const imgUpload = async (event) => {
    setFlag(false);
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };
  const SaveInfo = async (event) => {
    event.preventDefault();
    if (flag === false) {
      const formData = new FormData();
      formData.append("upload_file", imgFile);
      formData.append("member_info", JSON.stringify(IDJSon));
      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      console.log(flag);
      await axios
        .post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/profile/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          console.log(formData);
          if (response.data.response === 200) {
            console.log("이미지 업로드 완료");
          } else {
            console.log(response);
            alert("오류가 발생했습니다. 다시 시도해주세요");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("전송 오류가 발생했습니다. 다시 시도해주세요");
        });
    }
    await axios
      .post(
        "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/update-member-info",
        {
          email: userData.email,
          nick_name: userData.nick_name,
          name: userData.name,
          phone: userData.phone,
        }
      )
      .then((response) => {
        if (response.data.update_member_info === true) {
          console.log("유저데이터 업로드 완료");
          navigate("/Mypage", { state: userData.email });
        } else {
          console.log(response);
          alert("오류가 발생했습니다! 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생했습니다. 다시 시도해주세요");
      });
  };
  const InfoPWReset = (event) => {
    navigate("/auth/mypage/PWConfirm");
  };
  const withdraw = (event) => {
    navigate("/auth/mypage/Withdraw");
  };
  return (
    <div className="ModifyInfo">
      <HeaderV2 ID={userData.email} />
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
            value={userData.nick_name}
            onChange={(event) =>
              setUserData((prevUserData) => ({
                ...prevUserData,
                nick_name: event.target.value,
              }))
            }
          />
        </div>
        <button className="deleteIMGModify" onClick={deleteIMG}>
          삭제
        </button>
      </div>
      <div className="right">
        <div className="ModifyDiv">
          <p className="PLable">Email</p>
          <p className="PEmail">{userData.email}</p>
        </div>
        <div className="ModifyDiv">
          <p className="PLable">PW</p>
          <button className="PWResetButton" onClick={InfoPWReset}>
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
