import "CSS/chatting/Chatting.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
const Chatting = (props) => {
  const user = props.chatData;
  const scrollContainerRef = useRef(null); //스크롤 고정용
  const [position, setPosition] = useState(0); //스크롤 위치 가져오기용
  //const [chatIndex, setChatIndex] = useState(0);
  var chatIndex_start = 0;
  var chatIndex_end = 0; // useState훅으로 바꿔주기
  var socket = new WebSocket(
    `ws://wisixicidi.iptime.org:3000${
      (user.host_id % 10) + (user.client_id % 10) + 1
    }/chatting-socket/${user.posting_id}/${user.host_id}/${user.client_id}`
  );
  useEffect(() => {
    socket.onmessage = function (event) {
      console.log("메시지 수신_data:", event.data);
      const jsonObject = JSON.parse(event.data);
      //초기 pastChat 저장 필요.

      chatIndex_start = jsonObject.index - 20;
      chatIndex_end = jsonObject.index - 10;
      //setChatIndex(jsonObject.index);
      // 과거 채팅 호출 시 필요한 start_index값 저장
    };
  }, []);

  const [pastChat, setPastChat] = useState([
    //시간 순서대로 배열 필요
    {
      time: "10:11",
      text: user.client_id,
      chatUser: ".",
    },
  ]);
  useEffect(() => {
    socket.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
    };
    return () => {
      socket.onclose = function (event) {
        console.log("WebSocket connection closed:", event);
      };
    };
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
    const isTop = () => {
      if (scrollContainerRef.current.scrollTop === 0) {
        getOldChat(); // 스크롤이 최상단에 위치해 있을 때.
      }
    };
    scrollContainerRef.current.addEventListener("scroll", isTop); // 스크롤 이벤트 리스너
    return () => {
      scrollContainerRef.current.removeEventListener("scroll", isTop); // 언마운트될 때 리스너 제거
    };
  }, []);

  //채팅 스크롤이 최상단에 위치했을 때, 추가적으로 메시지를 10개씩 불러온다.
  // 시간 최신 순 : 30개면 29 - 20옴.
  //API 주소 채팅 주소와 연동해서 보내기. ex) 13과 14의 경우 30008처럼 다른 url 사용해야함. 채팅은 다른 서버에서 관리중
  const handleNewMessage = (message) => {
    //새 메시지 도착 시 처리하는 콜백 함수
    setPastChat((prevChat) => [...prevChat, message]);
  };
  const newChatUpdate = (event) => {
    event.preventDefault();
    const input = document.getElementById("Chat");
    const text = input.value;
    const date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();
    let hours = date.getHours();
    let month = date.getMonth() + 1;
    let minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${year}-${month}-${day}-${hours}-${minutes}`;
    const chatUser = user.nickName; // 사용자 이름을 저장
    //console.log(user.nickName, chatUser);
    const message = {
      text,
      time,
      chatUser: "TEST",
    };
    if (text !== "") {
      socket.send(JSON.stringify(message));
      console.log(message);
      setPastChat((prevChat) => [...prevChat, message]);
      //index도 받아야함!
    }
    input.value = ""; // 채팅 입력란을 초기화
  };
  const getOldChat = async (event) => {
    //console.log(chatIndex);
    await axios
      .get(
        `http://wisixicidi.iptime.org:3000${
          (user.host_id % 10) + (user.client_id % 10) + 1
        }/chatting-record/${user.posting_id}/${user.host_id}/${
          user.client_id
        }/${chatIndex_start}/${chatIndex_end}`,
        {
          posting_id: user.posting_id,
          host_id: user.host_id,
          client_id: user.client_id,
          start_index: chatIndex_start,
          last_index: chatIndex_end,
        }
      )
      .then((response) => {
        console.log(response); //리스폰스 pastchat에 저장하기
        setPastChat((prev) => {
          const newChat = [...prev, response];
          newChat.sort((a, b) => a.index - b.index);
          return newChat;
        });
        chatIndex_end = chatIndex_start - 1;
        if (chatIndex_start >= 10) chatIndex_start -= 10;
        else chatIndex_start = 0;
        //인덱스 다시 저장 -> 추후 불러올때 꼭 필요!
      })
      .catch((err) => {
        console.log(err);
      });
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
            {chat.chatUser === "TEST" && (
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
        <button onClick={getOldChat}>불러오기</button>
      </div>
    </div>
  );
};
Chatting.defaultProps = {
  user: {
    email: "",
    nickName: "",
    posting_id: "string",
    host_id: 13,
    client_id: 15,
  },
};
export default Chatting;
