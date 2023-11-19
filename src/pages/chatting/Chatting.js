import "CSS/chatting/Chatting.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";

const Chatting = (props) => {
  //const user = props.chatData; //채팅 유저
  const scrollContainerRef = useRef(null); //스크롤 고정용
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [position, setPosition] = useState(0); //스크롤 위치
  const [isOver, setIsOver] = useState(false);
  const [pastChat, setPastChat] = useState([]);
  /* 로그인으로부터 내 정보 가져오기!!!!!!!!*/
  const { user, userEmail } = props;
  const [userNum, setUserNum] = useState(13);
  var chatIndex_start = 0;
  var chatIndex_end = 0;
  var socket = new WebSocket(
    `ws://wisixicidi.iptime.org:3000${
      (user.host_id % 10) + (user.client_id % 10) + 1
    }/chatting-socket/${user.posting_id}/${user.host_id}/${user.client_id}`
  );
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.post(
          "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/info",
          {
            //sessionID: cookies.sessionID,
            //세션 아이디로 사용자 정보 받아오기 -> 이메일을 location으로 넘기는 방법은 컴포넌트간 결합성이 높아져서 권장 XX
            email: userEmail,
          }
        );
        console.log(response);
        //setUserNum(response.data.userNum);
      } catch (err) {
        console.log(err);
        alert("오류가 발생했습니다");
      }
    }
    //getUserInfo();
    setUserNum(13);
  }, []);

  //const [prevScrollPosition, setPrevScrollPosition] = useState(10);
  const [flag, setflag] = useState(0);
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);
  const scrollToBottom = () => {
    // prevScrollPosition = scrollContainerRef.current.scrollHeight;
    //

    setTimeout(() => {
      setPrevScrollPosition(scrollContainerRef.current.scrollHeight);
      console.log(prevScrollPosition);
    }, 0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };
  if (flag === 0) {
    setTimeout(() => {
      scrollToBottom();
    }, 0);
  }
  const handleScroll = () => {
    // 스크롤 이벤트를 감지하여 최상단에 위치했을 때 실행할 함수
    if (scrollContainerRef.current.scrollTop === 0) {
      getOldChat(); // 스크롤이 최상단에 위치했을 때
    }
  };
  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  useEffect(() => {
    socket.onmessage = function (event) {
      const jsonString = event.data.replace(/'/g, '"');
      const jsonStringModi = jsonString.replace(/True/g, "true");
      const jsonStringModified = jsonStringModi.replace(/False/g, "false");

      const jsonObject = JSON.parse(jsonStringModified);
      let flag = 0;
      if (jsonObject.host_visible == false && user.id == user.host_id)
        flag++; //보이지 않는 채팅의 경우, pastChat에 추가  X
      else if (jsonObject.client_visible == false && user.id == user.client_id)
        flag++;
      else {
        setPastChat((prev) => {
          const newChat = [...prev, jsonObject];
          newChat.sort((a, b) => a.index - b.index);
          return newChat;
        });
        chatIndex_start = jsonObject.index - 20;
        chatIndex_end = jsonObject.index - 10;
      }
    };
  }, []);

  useEffect(() => {
    socket.onopen = (event) => {
      console.log("WebSocket connection opened:", event);
    };
    return () => {
      socket.onclose = function (event) {
        console.log("WebSocket connection closed:", event);
        setIsOver(true);
      };
    };
  }, []);

  const handleNewMessage = (message) => {
    //새 메시지 도착 시 처리하는 콜백 함수
    setPastChat((prev) => {
      const newChat = [...prev, message];
      newChat.sort((a, b) => a.index - b.index);
      return newChat;
    });
  };
  const newChatUpdate = (event) => {
    event.preventDefault();
    if (isOver) {
      alert("채팅이 끝난 방에서는 더이상 대화할 수 없습니다.");
    } else {
      const input = document.getElementById("Chat");
      const text = input.value;
      const host_visible = true;
      const client_visible = true;
      const date = new Date();
      let year = date.getFullYear();
      let day = date.getDate();
      let hours = date.getHours();
      let month = date.getMonth() + 1;
      let minutes = date.getMinutes().toString().padStart(2, "0");
      const time = `${year}-${month}-${day}-${hours}-${minutes}`;
      const message = {
        text,
        time,
        chatUser: user.chatUser,
        host_visible,
        client_visible,
      };
      if (text !== "") {
        socket.send(JSON.stringify(message));
      }
      input.value = ""; // 채팅 입력란을 초기화
    }
  };
  const getOldChat = async (event) => {
    setflag(1);
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
        //console.log(response.data.messages); //리스폰스 pastchat에 저장하기
        console.log(
          response.data.messages,
          response.data.messages.length,
          user.host_id,
          user.client_id,
          userNum
        );
        setPastChat((prev) => {
          const filteredChat1 = response.data.messages.filter((message) => {
            if (message.host_visible === false && user.id === user.host_id)
              return false;
            else if (
              message.client_visible === false &&
              user.id === user.client_id
            )
              return false; // 조건에 맞지 않는 요소를 필터링
            return true; // 조건에 맞는 요소를 유지
          });
          const newChat = [...prev, ...filteredChat1]; // 필터링된 새로운 요소를 추가
          newChat.sort((a, b) => a.index - b.index); // 인덱스에 따라 정렬
          return newChat;
        });
        chatIndex_end = chatIndex_start - 1;
        if (chatIndex_start >= 10) chatIndex_start -= 10;
        else chatIndex_start = 0;
        if (chatIndex_start == 0) flag(2);
        //인덱스 다시 저장 -> 추후 불러올때 꼭 필요!
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log(prevScrollPosition);
    if (scrollContainerRef.current && flag === 1) {
      const height = scrollContainerRef.current.scrollHeight;
      console.log("컴포넌트의 높이:", height, prevScrollPosition);
      scrollContainerRef.current.scrollTop = height - prevScrollPosition;
      // const newScroll = 800;
      // scrollContainerRef.current.scrollTop = newScroll;
      setPrevScrollPosition(height);
    }
    if (scrollContainerRef.current && flag == 2) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [pastChat]);

  const deletRoomm = async (event) => {
    await axios
      .post(
        "http://wisixicidi.iptime.org:30000/api/v1.0.0/chatting/exiting-chatting",
        {
          posting_id: user.posting_id,
          host_id: user.host_id.toString(),
          client_id: user.client_id.toString(),
          request_client: "13",
        }
      )
      .then((response) => {
        console.log("삭제 성공:", response);
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };

  const formatTime = (timeString) => {
    const [year, month, day, hours, minutes] = timeString
      .split("-")
      .map(Number);
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${formattedHours} : ${formattedMinutes}`;

    return formattedTime;
  };
  const formatTime2 = (timeString) => {
    const [year, month, day, hours, minutes] = timeString
      .split("-")
      .map(Number);

    return `${year}년 ${month}월 ${day}일`;
  };
  const renderChatMessages = pastChat.map((chat, index) => {
    const displayDate =
      index === 0 ||
      formatTime2(pastChat[index].time) !==
        formatTime2(pastChat[index - 1].time);
    return (
      <div key={index}>
        {displayDate && (
          <div className="dateSeparator">{formatTime2(chat.time)}</div>
        )}
        {chat.text !== "" && chat.chatUser !== user.chatUser && (
          <div className="leftChat">
            <div className="ChatTextL">{chat.text}</div>
            <span className="ChatTime">{formatTime(chat.time)}</span>
          </div>
        )}

        {chat.text !== "" && chat.chatUser === user.chatUser && (
          <div className="rightChat">
            <span className="ChatTime">{formatTime(chat.time)}</span>
            <div className="ChatTextR">{chat.text}</div>
          </div>
        )}
      </div>
    );
  });
  return (
    <div className="Chatting">
      <div className="pastChat" ref={scrollContainerRef}>
        {renderChatMessages}
        {isOver && <p>채팅이 끝났습니다.</p>}
      </div>
      <div className="chatEnter">
        <div className="chatInput">
          <input id="Chat" type="text" name="Chat" />
        </div>
        <button className="chatButton" onClick={newChatUpdate}>
          전송
        </button>
        <button className="deletRoomm" onClick={deletRoomm}>
          나가기
        </button>
      </div>
    </div>
  );
};
Chatting.defaultProps = {
  user: {
    chatUser: "string",
    id: 13,
    posting_id: "string",
    host_id: 13,
    client_id: 14,
  },
};
export default Chatting;
