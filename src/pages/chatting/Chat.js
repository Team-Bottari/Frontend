import ChattingList from "./ChattingList";
import Chatting from "./Chatting";
import { useState, useEffect } from "react";
import "CSS/chatting/Chat.css";
import HeaderV2 from "components/header/HeaderV2";
const Chat = () => {
  const [chattingUser, setChattingUser] = useState([
    {
      email: "더미이메일1",
      profileIMGURL: "/images/otherLogo/Google.png",
      nickName: "홍길동",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      /* useEffect로 받아오기 */
    },
    {
      email: "더미이메일2",
      profileIMGURL: "/images/otherLogo/Naver.png",
      nickName: "더미2",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      /* useEffect로 받아오기 */
    },
    {
      email: "더미이메일3",
      profileIMGURL: "/images/otherLogo/Google.png",
      nickName: "더미3",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      /* useEffect로 받아오기 */
    },
    {
      email: "더미이메일4",
      profileIMGURL: "/images/otherLogo/Google.png",
      nickName: "더미4",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      /* useEffect로 받아오기 */
    },
    {
      email: "더미이메일5",
      profileIMGURL: "/images/otherLogo/Kakao.png",
      nickName: "더미5",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      /* useEffect로 받아오기 */
    },
    {
      email: "더미이메일6",
      profileIMGURL: "/images/otherLogo/Google.png",
      nickName: "더미6",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      /* useEffect로 받아오기 */
    },
    {
      email: "더미이메일7",
      profileIMGURL: "/images/otherLogo/Google.png",
      nickName: "더미7",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      /* useEffect로 받아오기 */
    },
  ]);
  const [clickChattingUser, setClickChattingUser] = useState({
    email: "",
    nickName: "",
  });
  const chattingClick = async (index) => {
    setClickChattingUser({
      email: chattingUser[index].email,
      nickName: chattingUser[index].nickName,
    });
  };
  useEffect(() => {}, [clickChattingUser]);
  return (
    <div className="Chat">
      <div className="ListOfChatting">
        <HeaderV2 ID={"userData.email 프로퍼티 넘겨주기"} />
        {chattingUser.map((dataUser, index) => (
          <div className="buttonDiv" key={index + 1}>
            <ChattingList key={index} userData={dataUser} />
            <button
              className="ChattingListButton"
              onClick={() => {
                chattingClick(index);
              }}
            ></button>
            <div></div>
          </div>
        ))}
      </div>
      <hr />
      <div className="Chatting">
        {clickChattingUser && <Chatting chatData={clickChattingUser} />}
      </div>
    </div>
  );
};
export default Chat;
