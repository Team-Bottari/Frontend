import "CSS/chatting/ChattingList.css";
import { useState } from "react";
const ChattingList = (propsChatting) => {
  const [userData, setUserData] = useState(propsChatting.userData);
  console.log(userData);
  const MAX_LENGTH = 6;
  const shortenText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`; // 일정 길이 이상이면 일부만 표시
    }
    return text;
  };
  return (
    <div className="ChattingList">
      <div className="directionRow">
        <p className="ChatNick"> {userData.chatUser}</p>
        <div className="ChattingInfo">
          <p className="LastChat"> {shortenText(userData.text, MAX_LENGTH)}</p>
          <p className="ChatTime">{userData.time}</p>
        </div>
      </div>
      <div className="theLine"></div>
    </div>
  );
};
ChattingList.defaultProps = {
  userData: {
    email: "",
    profileIMGURL: "",
    nickName: "",
    lastChat: "",
    ChatTime: "",
  },
};
export default ChattingList;
