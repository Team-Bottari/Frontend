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
      posting_id: "string",
      host_id: 13, // 게시물 쓴 사람
      client_id: 15, //내 아이디
      /* useEffect로 받아오기 */
    },
    {
      email: "더미이메일2",
      profileIMGURL: "/images/otherLogo/Naver.png",
      nickName: "더미2",
      lastChat: "ㅋㅋㅋㅋㅋㅋㅋㅋ",
      ChatTime: "2023. 05. 01",
      posting_id: "string",
      host_id: 13, // 게시물 쓴 사람
      client_id: 14, //내 아이디
      /* useEffect로 받아오기 */
    },
  ]);
  const [clickChattingUser, setClickChattingUser] = useState({
    email: "",
    nickName: "",
    posting_id: -1,
    host_id: 0, // 게시물 쓴 사람
    client_id: 0, //내 아이디
  });
  const chattingClick = async (index) => {
    setClickChattingUser({
      email: chattingUser[index].email,
      nickName: chattingUser[index].nickName,
      posting_id: chattingUser[index].posting_id,
      host_id: chattingUser[index].host_id,
      client_id: chattingUser[index].client_id,
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
        {clickChattingUser.posting_id === -1 ? (
          <div> 채팅방을 선택해주세요 </div>
        ) : (
          <Chatting chatData={clickChattingUser} />
        )}
        {
          //clickChattingUser && <Chatting chatData={clickChattingUser} />
        }
      </div>
    </div>
  );
};
export default Chat;
