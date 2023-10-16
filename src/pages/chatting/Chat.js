import ChattingList from "./ChattingList";
import Chatting from "./Chatting";
import { useState, useEffect } from "react";
import "CSS/chatting/Chat.css";
import HeaderV2 from "components/header/HeaderV2";
import { useLocation } from "react-router-dom";
import axios from "axios";
const Chat = () => {
  const location = useLocation();
  const userEmail = location.state; // "user1234@example.com"
  const [chattingUser, setChattingUser] = useState([
    {
      profileIMGURL: "/images/otherLogo/Naver.png",
      chatUser: "",
      text: "",
      time: "",
      posting_id: "string",
      id: 0,
      host_id: 0, // 게시물 쓴 사람
      client_id: 0,
    },
  ]);
  const [clickChattingUser, setClickChattingUser] = useState({
    /* chatUser: "",
    id:0,
    posting_id: -1,
    host_id: 0, // 게시물 쓴 사람
    client_id: 0, //내 아이디*/
    chatUser: "TEST",
    id: 14,
    posting_id: "string",
    host_id: 13,
    client_id: 14,
  });
  const chattingClick = async (index) => {
    setClickChattingUser({
      chatUser: chattingUser[index].chatUser,
      id: chattingUser[index].id,
      posting_id: chattingUser[index].posting_id,
      host_id: chattingUser[index].host_id,
      client_id: chattingUser[index].client_id,
    });
  };
  useEffect(() => {
    axios
      .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/chatting/list", {
        id: "14",
      })
      .then((response) => {
        console.log(response.data.chatting_list);
        setChattingUser(response.data.chatting_list);
      })
      .catch((err) => {
        console.log(err);
        alert("오류가 발생했습니다.");
      });
  }, []);
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
          //<Chatting chatData={clickChattingUser} />
        }
      </div>
    </div>
  );
};
export default Chat;
