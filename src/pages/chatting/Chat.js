import ChattingList from "./ChattingList";
import Chatting from "./Chatting";
import { useState, useEffect } from "react";
import "CSS/chatting/Chat.css";
import HeaderV2 from "components/header/HeaderV2";
import { useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
const Chat = () => {
  const location = useLocation();
  //const userEmail = location.state; // "user1234@example.com"
  const userEmail = "user1234@example.com";
  //const [usserID, setUserID] = useState("user1234@example.com");
  const [token, settoken] = useState("");
  const [Cookie] = useCookies(["token"]);
  console.log(Cookie);
  const [chattingUser, setChattingUser] = useState([
    // {
    //   chatUser: "",
    //   text: "",
    //   time: "",
    //   posting_id: "string",
    //   id: 0,
    //   host_id: 0, // 게시물 쓴 사람
    //   client_id: 0,
    // },
    {
      chatUser: "TESeeeT",
      text: "ㅇㅇㅇㅇ",
      time: "2022-12-12",
      posting_id: "string",
      id: 13,
      host_id: 13, // 게시물 쓴 사람
      client_id: 14,
    },
    {
      chatUser: "TEST",
      text: "ㅇㅇㅇㅇ",
      time: "2022-12-12",
      posting_id: "string",
      id: 13,
      host_id: 13, // 게시물 쓴 사람
      client_id: 14,
    },
    {
      chatUser: "TES22T",
      text: "ㅇffffffffffㅇㅇ",
      time: "2022-12-12",
      posting_id: "string",
      id: 13,
      host_id: 13, // 게시물 쓴 사람
      client_id: 14,
    },
    {
      chatUser: "TESewerT",
      text: "ㅇㅇ가나다라라ㅏ라라라ㅇㅇ",
      time: "2022-12-12",
      posting_id: "string",
      id: 13,
      host_id: 13, // 게시물 쓴 사람
      client_id: 14,
    },
  ]);
  const [clickChattingUser, setClickChattingUser] = useState({
    chatUser: "TEST",
    id: 0,
    posting_id: -1,
    host_id: 0,
    client_id: 0,
  });
  const chattingClick = async (index) => {
    await setClickChattingUser({
      chatUser: chattingUser[index].chatUser,
      id: chattingUser[index].id,
      posting_id: chattingUser[index].posting_id,
      host_id: chattingUser[index].host_id,
      client_id: chattingUser[index].client_id,
    });
  };
  // useEffect(() => {
  //   axios
  //     .post("http://wisixicidi.iptime.org:30000/api/v1.0.0/chatting/list", {
  //       id: userEmail,
  //     })
  //     .then((response) => {
  //       console.log(response.data.chatting_list);
  //       setChattingUser(response.data.chatting_list);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("채팅 리스트 : 오류가 발생했습니다.");
  //     });
  // }, []);
  useEffect(() => {}, [clickChattingUser]);
  return (
    <div className="Chat">
      <div className="ListOfChatting">
        <HeaderV2 ID={userEmail} />
        {chattingUser.length === 0 ? (
          <div>채팅 내역이 없습니다</div>
        ) : (
          chattingUser.map((dataUser, index) => (
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
          ))
        )}
      </div>
      <hr />
      <div className="Chatting">
        {clickChattingUser.posting_id === -1 ? (
          <p> 채팅방을 선택해주세요 </p>
        ) : (
          <Chatting
            clickChattingUser={clickChattingUser}
            userEmail={userEmail}
          />
        )}
      </div>
    </div>
  );
};
export default Chat;
// useEffect(() => {
//   async function getUserInfo() {
//     try {
//       const response = await axios.post(
//         "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/info",
//         //{ email: location.state }, // 삭제 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! -> null로 변경
//         { email: location.state },
//         null,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${Cookie.token}`,
//           },
//         }
//       );
//       console.log(response);
//       //

//       setUserID(response.data.id);
//     } catch (err) {
//       console.log("오류: ", err);
//       alert("user_info:오류가 발생했습니다");
//     }
//   }
//   //getUserInfo();
// }, [location.state]);
