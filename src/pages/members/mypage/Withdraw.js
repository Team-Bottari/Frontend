import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Withdraw = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const withdrawFinal = async (event) => {
    event.preventDefault();
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/withdrawal", {
        id: ID,
      })
      .then((response) => {
        if (response.data.withdrawal === true) {
          alert("탈퇴되었습니다.");
          navigate("/");
        } else {
          console.log(response);
          alert("오류가 발생하여 탈퇴에 실패했습니다. 다시 시도해주세요");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생하여 탈퇴에 실패했습니다. 다시 시도해주세요");
      });
  };
  return (
    <div>
      <p>탈퇴하시겠습니까?</p>
      <p>본인의 ID를 입력해주세요</p>
      <input value={ID} onChange={(event) => setID(event.target.value)} />
      <button onClick={withdrawFinal}>탈퇴하기</button>
    </div>
  );
};
export default Withdraw;
