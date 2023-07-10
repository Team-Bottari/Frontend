import { useNavigate /*useLocation*/ } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "CSS/members/PWReset.css";
import "CSS/members/Login.css";
const PWReset = () => {
  const navigate = useNavigate();
  //const location = useLocation(); 새로고침에 필요
  const [ID, setID] = useState("");
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [BirthDay, setBirthDay] = useState("1990-01-01");
  const [self, setSelf] = useState(true);
  const emailRegex =
    /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  //이메일 유효성 검사

  const sendEmail = async (event) => {
    event.preventDefault();
    console.log(ID + Email, Name, BirthDay);
    if (!emailRegex.test(ID + Email)) {
      alert("유효하지 않은 이메일 주소입니다. 다시 확인해주세요");
    } else {
      await axios
        .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/pw-find", {
          email: ID + Email,
          name: Name,
          birth: BirthDay,
        })
        .then((response) => {
          console.log(response);
          alert("이메일 전송");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          //window.location.reload(); 새로고침. 새로고침이 필요하지 않다고 판단됨. 추후 필요하다고 판단되면 추가.
        });
    }
  };
  const EmailSet = (event) => {
    if (event.target.value === "self") {
      setEmail("");
      setSelf(true);
    } else {
      setSelf(false);
      setEmail(event.target.value);
    }
  };
  return (
    <div className="PWReset">
      <div className="Logo">
        <img alt="main Logo" className="LogoIMG" src="/images/LogoWhite.png" />
      </div>
      <div className="PWReset_Input">
        <div className="PWReset_Div">
          <label htmlFor="Email_input">Email</label>
          <input
            id="Email_input"
            className="IDinput"
            type="text"
            value={ID}
            onChange={(event) => setID(event.target.value)}
          />
          {self === false && (
            <input
              id="Email_where"
              className="emailInput"
              type="text"
              value={Email}
              readOnly
            />
          )}
          {self === true && (
            <input
              className="emailInput"
              id="Email_where"
              type="text"
              placeholder="@직접입력"
              value={Email}
              onChange={(event) => setEmail(event.target.value)}
            />
          )}
          <select onChange={EmailSet}>
            <option value="self">직접입력</option>
            <option value="@gmail.com">Gmail</option>
            <option value="@naver.com">Naver</option>
            <option value="@kakao.com">Kakao</option>
            <option value="@daum.net">Daum</option>
            <option value="@nate.net">Nate</option>
          </select>
        </div>
        <div className="PWReset_Div">
          <label htmlFor="Name_input">이름</label>
          <input
            className="Name_input"
            id="Name_input"
            type="text"
            value={Name}
            onChange={(event) => setName(event.target.value)}
          />{" "}
        </div>
        <div className="PWReset_Div_Birth">
          <label htmlFor="Birth_input">생년월일</label>
          <input
            id="Birth_input"
            className="Birth_input"
            type="date"
            value={BirthDay}
            onChange={(event) => setBirthDay(event.target.value)}
          />{" "}
        </div>
        <button onClick={sendEmail}>확인</button>
      </div>
    </div>
  );
};
export default PWReset;
