import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../CSS/members/Register.css";
const Register = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [Nickname, setNickname] = useState("");
  const [CheckPw, setCheckPw] = useState("");
  const [Name, setName] = useState("");
  const [Birth, setBirth] = useState("");
  const [Phonenumber, setNumber] = useState("");
  const dupcheck = async (event) => {
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/override", {
        id: Email,
      })
      .then((response) => {
        if (response.data.override === true) {
          console.log(response);
          console.log("중복");
          alert("가입실패");
        } else {
          console.log(response.data === false);
          console.log("중복아님");
        }
        alert("가입성공.");
      });
  };
  const Registeraxios = async (event) => {
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/sign_up", {
        id: Email,
        pw: PW,
        nick_name: Nickname,
        name: Name,
        phone: Phonenumber,
        birth: Birth,
        credit_rating: 0,
      })

      .then((response) => {
        if (response.data.sign_up === true) {
          console.log("회원가입 성공");
          navigate("/");
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (PW !== CheckPw) {
      alert("비밀번호를 확인해주세요.");
    }
    /*
   console.log({
     Email,
     Nickname,
     Birth,
     PW,
     CheckPw,
   });*/
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
    console.log("이메일 입력 완료");
  };

  const onPwHandler = (event) => {
    setPW(event.currentTarget.value);
  };
  const oncheckpwHandler = (event) => {
    setCheckPw(event.currentTarget.value);
  };
  const onsetNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onsetnumberHandler = (event) => {
    setNumber(event.currentTarget.value);
  };
  const onsetBirthHandler = (event) => {
    setBirth(event.currentTarget.value);
  };
  const onsetNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  return (
    <div className="sign">
      <div className="register">
        <h1>회원가입</h1>
        <br />
        <form onSubmit={onSubmitHandler}>
          <label>이메일</label>
          <br />

          <input
            type="Email"
            value={Email}
            placeholder="youemail@gmail.com"
            onChange={onEmailHandler}
          />
          <button className="dup" onClick={dupcheck}>
            {" "}
            중복확인{" "}
          </button>

          <br />

          <label htmlFor="password"> 비밀번호</label>
          <br />

          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={onPwHandler}
          />
          <br />

          <label htmlFor="check password"> 비밀번호 확인</label>
          <br />

          <input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={oncheckpwHandler}
          />
          <br />
          <label htmlFor="nickname"> 닉네임</label>
          <br />

          <input
            type="text"
            placeholder="닉네임"
            id="nickname"
            name="nickname"
            onChange={onsetNicknameHandler}
          />
          <br />

          <label htmlFor="name"> 이름 </label>
          <br />

          <input
            type="text"
            placeholder="이름"
            id="name"
            name="name"
            onChange={onsetNameHandler}
          />
          <br />
          <label htmlFor="birth"> 생년월일 </label>
          <br />

          <input
            type="date"
            id="password"
            name="password"
            onChange={onsetBirthHandler}
          />
          <br />
          <label htmlFor="number"> 핸드폰번호 </label>
          <br />

          <input
            type="tel"
            id="password"
            name="phonenumber"
            onChange={onsetnumberHandler}
          />
        </form>

        <button className="reg" onClick={Registeraxios}>
          가입
        </button>
      </div>
    </div>
  );
};
export default Register; // 회원가입 실명인증 페이지
