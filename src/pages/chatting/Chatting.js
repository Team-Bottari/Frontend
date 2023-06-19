import "CSS/chatting/Chatting.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
const Chatting = (props) => {
  const user = props.chatData;
  const scrollContainerRef = useRef(null); //스크롤 고정용
  //const socket = io("웹소켓 서버 URL");
  const [pastChat, setPastChat] = useState([
    {
      time: "오전10:11",
      text: "더미 텍스트 내역입니다.",
      chatUser: "user1",
    },
    {
      time: "오전10:12",
      text: "더미 텍스트 내역입니다222222222222.",
      chatUser: "user1",
    },
    {
      time: "오전10:15",
      text: "더미 텍스트 내역입니다32323223.",
      chatUser: "홍길동",
    },
    {
      time: "오전10:40",
      text: "더미 텍스트 내역입니다.",
      chatUser: "user1",
    },
  ]); /*
  useEffect(() => {
    axios.get("url").then(() => {
      setPastChat(); //과거 채팅내역 가져오기
    });
    socket.on("newMessage", handleNewMessage); //컴포넌트 마운트 시 이벤트 리스너 등록
    return () => {
      socket.off("newMessage", handleNewMessage); //컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);*/
  useEffect(() => {
    console.log(user);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [pastChat]);

  const handleNewMessage = (message) => {
    //새 메시지 도착 시 처리하는 콜백 함수
    setPastChat((prevChat) => [...prevChat, message]);
  };
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };
  const newChatUpdate = (event) => {
    event.preventDefault();
    const input = document.getElementById("Chat");
    const text = input.value;
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    let time = "";

    if (hours < 13) {
      hours = hours.toString().padStart(2, "0");
      time = `오전${hours}:${minutes}`; // 채팅 보낸 시간
    } else if (hours >= 13) {
      hours -= 12;
      time = `오후${hours}:${minutes}`; // 채팅 보낸 시간
    }

    const chatUser = user.nickName; // 사용자 이름을 저장
    const message = {
      text,
      time,
      chatUser,
    };
    if (text !== "") {
      //socket.emit("sendMessage", message);
      setPastChat((prevChat) => [...prevChat, message]); //소켓 열리면 해당 줄 삭제 필요!
    }
    input.value = ""; // 채팅 입력란을 초기화
  };
  return (
    <div className="Chatting">
      <div className="pastChat" ref={scrollContainerRef}>
        {pastChat.map((chat, index) => (
          <div key={index}>
            {chat.chatUser !== user.nickName && (
              <div className="leftChat">
                <span className="ChatUser">{chat.chatUser}</span>
                <div className="ChatTextL">{chat.text}</div>
                <span className="ChatTime">{chat.time}</span>
              </div>
            )}
            {chat.chatUser === user.nickName && (
              <div className="rightChat">
                <span className="ChatTime">{chat.time}</span>
                <div className="ChatTextR">{chat.text}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="chatEnter">
        <div className="chatInput">
          <button className="chatPlus">+</button>
          <input id="Chat" type="text" name="Chat" />
        </div>
        <button className="chatButton" onClick={newChatUpdate}>
          전송
        </button>
      </div>
    </div>
  );
};
Chatting.defaultProps = {
  user: {
    email: "",
    nickName: "",
  },
};
export default Chatting;
