import "CSS/chatting/Chatting.css";
import { useState, useRef, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
const Chatting2 = (props) => {
  //const user = props.chatData; //채팅 유저
  const scrollContainerRef = useRef(null); //스크롤 고정용
  const [position, setPosition] = useState(0); //스크롤 위치
  const [isOver, setIsOver] = useState(false);
  const [pastChat, setPastChat] = useState([]);
  /* 로그인으로부터 내 정보 가져오기!!!!!!!!*/
  const { user, userEmail } = props;
  const [userNum, setUserNum] = useState(14);
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
    setUserNum(14);
  }, []);
  useEffect(() => {
    console.log(user.id, userNum);
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
        console.log(
          response.data.messages,
          user.host_id,
          user.client_id,
          userNum
        ); //리스폰스 pastchat에 저장하기
        setPastChat((prev) => {
          const filteredChat2 = response.data.messages.filter((message) => {
            /* 채팅2랑 채팅1 컴포넌트 둘이 겹쳐서 하나만 테스트가 안됨.  */
            if (message.host_visible === false && user.id === user.host_id)
              return true;
            else if (
              message.client_visible === false &&
              user.id === user.client_id
            )
              return true; // 조건에 맞지 않는 요소를 필터링
            return true; // 조건에 맞는 요소를 유지
          });
          console.log(filteredChat2);
          const newChat = [...prev, ...filteredChat2]; // 필터링된 새로운 요소를 추가
          newChat.sort((a, b) => a.index - b.index); // 인덱스에 따라 정렬
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
  const deletRoomm = async (event) => {
    await axios
      .post(
        "http://wisixicidi.iptime.org:30000/api/v1.0.0/chatting/exiting-chatting",
        {
          posting_id: user.posting_id,
          host_id: user.host_id.toString(),
          client_id: user.client_id.toString(),
          request_client: "14",
        }
      )
      .then((response) => {
        console.log("삭제 성공:", response);
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
      });
  };
  return (
    <div className="Chatting">
      <div className="pastChat" ref={scrollContainerRef}>
        {user.id}
        <div>dddddd</div>
        {pastChat.map((chat, index) => (
          <div key={index}>
            {chat.text !== "" && chat.chatUser !== user.chatUser && (
              <div className="leftChat">
                <span className="ChatUser">{chat.chatUser}</span>
                <div className="ChatTextL">{chat.text}</div>
                <span className="ChatTime">{chat.time}</span>
              </div>
            )}
            {chat.text !== "" && chat.chatUser === user.chatUser && (
              <div className="rightChat">
                <span className="ChatTime">{chat.time}</span>
                <div className="ChatTextR">{chat.text}</div>
              </div>
            )}
          </div>
        ))}

        {isOver && <p>채팅이 끝났습니다.</p>}
      </div>
      <div className="chatEnter">
        <div className="chatInput">
          <button className="chatPlus">+</button>
          <input id="Chat" type="text" name="Chat" />
        </div>
        <button className="chatButton" onClick={newChatUpdate}>
          전송
        </button>
        <button onClick={deletRoomm}>삭제</button>
      </div>
    </div>
  );
};
Chatting2.defaultProps = {
  user: {
    chatUser: "string2",
    id: 14,
    posting_id: "string",
    host_id: 13,
    client_id: 14,
  },
};
export default Chatting2;
