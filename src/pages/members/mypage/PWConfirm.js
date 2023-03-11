import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../../CSS/mypage/PWConfirm.css";
const PWConfirm = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [currentPW, setCurrentPW] = useState("");
  const [newPW, setNewPW] = useState("");
  const [newPWConfirm, setNewPWConfirm] = useState("");
  const [newPWConfirmTF, setNewPWConfirmTF] = useState(true);
  const [newPWConfirmTFButton, setNewPWConfirmTFButton] = useState(true);
  const confirmPW = async (event) => {
    setNewPWConfirm(event.target.value);
    if (event.target.value === newPW) {
      setNewPWConfirmTFButton(false);
      setNewPWConfirmTF(true);
    } else {
      setNewPWConfirmTFButton(true);
      setNewPWConfirmTF(false);
    }
  };
  const PWResetConfirm = async (event) => {
    console.log(ID, currentPW, newPWConfirm);
    if (newPW === currentPW) {
      alert("현재 비밀번호와 같은 비밀번호로는 변경할 수 없습니다.");
    } else if (newPW !== newPWConfirm) {
      //버튼 비활성화
    } else {
      event.preventDefault();
      console.log(ID, currentPW, newPWConfirm);
      await axios
        .post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/pw-change",
          {
            id: ID,
            before_pw: currentPW,
            new_pw: newPWConfirm,
          }
        )
        .then((response) => {
          if (response.data.pw_change === true) {
            console.log(response);
            alert("변경되었습니다.");
            navigate("/Mypage");
          } else {
            console.log(response);
            alert("변경에 실패했습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("변경에 실패했습니다.");
        });
    }
  };
  return (
    <div className="PWConfirm">
      <div className="Logo">
        <img alt="main Logo" className="LogoIMG" src="/images/LogoWhite.png" />
      </div>
      <form>
        <div className="InputMPWC">
          <div className="InputLabel">
            <label htmlFor="ID">Email</label>
          </div>
          <input
            id="ID"
            type="email"
            name="ID"
            value={ID}
            onChange={(event) => setID(event.target.value)}
          />
        </div>
        <div className="InputMPWC">
          <div className="InputLabel">
            <label htmlFor="currentPW_input">현재 PW</label>
          </div>
          <input
            id="currentPW_input"
            type="password"
            name="currentPW"
            value={currentPW}
            autoComplete="off"
            onChange={(event) => setCurrentPW(event.target.value)}
          />
        </div>
        <div className="InputMPWC">
          <div className="InputLabel">
            <label htmlFor="newPW_input">새 PW</label>
          </div>
          <input
            id="newPW_input"
            type="password"
            name="newPW"
            value={newPW}
            autoComplete="off"
            onChange={(event) => setNewPW(event.target.value)}
          />
        </div>
        <div className="InputMPWC">
          <div className="InputLabel">
            <label htmlFor="newPWConfirm_input">PW 확인</label>
          </div>
          <input
            id="newPWConfirm_input"
            type="password"
            name="newPWConfirm"
            value={newPWConfirm}
            autoComplete="off"
            onChange={confirmPW}
          />
        </div>
        <div className="warning">
          {newPWConfirmTF === false &&
            "비밀번호가 일치하지 않습니다. 다시 확인해주세요"}
        </div>
      </form>
      <button
        className={newPWConfirmTFButton ? "disabled" : "active"}
        disabled={newPWConfirmTFButton}
        onClick={PWResetConfirm}
      >
        확인
      </button>
    </div>
  );
};
export default PWConfirm;
