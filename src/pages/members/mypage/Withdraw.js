import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
const Withdraw = () => {
  const navigate = useNavigate();
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [Cookie] = useCookies(["token"]);
  console.log(Cookie);
  const withdrawFinal = async (event) => {
    /**탈퇴할때 왜 pw가 맞는지 확인을 안하지? 다시 확인하기 */
    event.preventDefault();
    await axios
      .post(
        "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/withdrawal",
        { pw: PW },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookie.token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.withdrawal === 200) {
          alert("탈퇴되었습니다.");
          navigate("/");
        } else {
          console.log(response);
          alert("front 오류가 발생하여 탈퇴에 실패했습니다. 다시 시도해주세요");
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
      <p>본인의 ID와 PW를 입력해주세요</p>

      <input
        type="password"
        value={PW}
        onChange={(event) => setPW(event.target.value)}
      />
      <button onClick={withdrawFinal}>탈퇴하기</button>
    </div>
  );
};
export default Withdraw;
