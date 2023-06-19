import "CSS/chatting/ChattingList.css";
import { useState } from "react";
const ChattingList = (propsChatting) => {
  const [userData, setUserData] = useState(propsChatting.userData);
  return (
    <div className="ChattingList">
      <div className="directionRow">
        <div className="profileIMG">
          <img
            alt="Chatting Profile"
            className="profileIMGFile"
            src={userData.profileIMGURL}
          />
        </div>
        <div className="ChattingInfo">
          <p className="ChatNick">{userData.nickName}</p>
          <p className="LastChat">{userData.lastChat}</p>
          <p className="ChatTime">{userData.ChatTime}</p>
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
