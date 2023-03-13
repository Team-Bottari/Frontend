import /* useNavigate */ "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../CSS/members/IDSearch.css";

const IDSearch = () => {
  const [Name, setName] = useState("");
  const [Birth, setBirth] = useState("");
  const Sendinform = async (event) => {
    await axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/member/id-find", {
        name: Name,
        birth: Birth,
      })
      .then((response) => {
        console.log(response);
        if (response.data.id !== false) {
          console.log(response.data.id);
          alert(response);
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onsetNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onsetBirthHandler = (event) => {
    setBirth(event.currentTarget.value);
  };

  return (
    <div>
      <title>아이디찾기</title>

      <div className="Inform">
        <header className="Pagename">
          <h2> 아이디 찾기</h2>
        </header>
      </div>
      <div className="IdReset">
        <img alt="main Logo" className="LogoIMG" src="/images/purplelogo.png" />
        <br></br>
        <form>
          <div className="Id_Div">
            <label htmlFor="Name_input">이름</label>
            <input
              className="Name_input"
              id="Name_input"
              type="text"
              value={Name}
              onChange={onsetNameHandler}
            />{" "}
          </div>
          <div className="Birth_Div">
            <label htmlFor="Name_input">생년월일</label>
            <input
              className="Name_input"
              id="Name_input"
              type="date"
              onChange={onsetBirthHandler}
            />{" "}
          </div>
        </form>

        <button onClick={Sendinform}>확인</button>
      </div>
    </div>
  );
};
export default IDSearch;
