import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import HeaderV1 from "../../../components/header/HeaderV1";
import "../../../CSS/mypage/ModifyInfo.css";
const ModifyInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState(location.state);
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
  const InfoPWReset = async (event) => {
    event.preventDefault();
    let userR = window.confirm(
      "본인인증이 필요합니다.\n 이메일로 본인인증을 진행하시겠습니까?."
    );
    if (userR === true) {
      alert(
        "전송되었습니다.\n 해당 이메일의 확인을 누르시면 비밀번호를 재설정 할 수 있습니다."
      );
      navigate("/auth/mypage/PWConfirm");
      /*await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/", {//아직 api 없음
        
      })
      .then((response) => {
        if (response.data. === true) {
          alert("전송되었습니다.\n 해당 이메일의 확인을 누르시면 비밀번호를 재설정 할 수 있습니다.")
          
        } else {
          console.log(response);
          alert("본인인증 이메일 전송 중 오류가 발생했습니다.\n 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("본인인증 이메일 전송 중 오류가 발생했습니다.\n 다시 시도해주세요");
      });*/
    } else if (userR === false) {
      alert("취소했습니다.");
    }
  };
  const withdraw = async (event) => {
    event.preventDefault();
    let userR = window.confirm(
      "본인인증이 필요합니다.\n 이메일로 본인인증을 진행하시겠습니까?."
    );
    if (userR === true) {
      alert(
        "전송되었습니다.\n 해당 이메일의 확인을 누르시면 탈퇴 할 수 있습니다."
      );
      navigate("/auth/mypage/Withdraw");
      /*await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/withdrawal", {
        
      })
      .then((response) => {
        if (response.data. === true) {
          alert("전송되었습니다.\n 해당 이메일의 확인을 누르시면 탈퇴 할 수 있습니다.")
          
        } else {
          console.log(response);
          alert("본인인증 이메일 전송 중 오류가 발생했습니다.\n 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("본인인증 이메일 전송 중 오류가 발생했습니다.\n 다시 시도해주세요");
      });*/
    } else if (userR === false) {
      alert("취소했습니다.");
    }
  };
  return (
    <div className="ModifyInfo">
      <HeaderV1 />
      <div className="side"></div>
      <div className="leftDiv">
        <img alt="user" className="useImg" src={userData.img} />
        <input
          id="name_input"
          type="text"
          name="Name"
          value={userData.name}
          onChange={
            (event) => setUserData(userData) // 수정하기
          }
        />
      </div>
      <div className="right">
        <div className="ModifyDiv">
          <p>Email</p>
          <p>{userData.id}</p>
        </div>
        <div className="ModifyDiv">
          <p>PW</p>
          <button className="PWReset" onClick={InfoPWReset}>
            재설정
          </button>
        </div>
        <button className="Logout" onClick={logOut}>
          로그아웃
        </button>
        <button className="Logout" onClick={SaveInfo}>
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
