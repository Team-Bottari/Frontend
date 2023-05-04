import "../../CSS/chatting/Chatting.css";
import { useState } from "react";
const Chatting = (props) => {
  const user = props.chatData;
  return <div className="ChattingList">{user.nickName}</div>;
};
Chatting.defaultProps = {
  user: {
    email: "",
    nickName: "",
  },
};
export default Chatting;
