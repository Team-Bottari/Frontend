import React from "react";

import axios from "axios";
import { setCookie } from "./cookie";
const Loginsession = () => {
  let token;
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const formData = new URLSearchParams();
  formData.append("username", "user123@example.com");
  formData.append("password", "user1234567");

  axios
    .post(
      "http://wisixicidi.iptime.org:30000/api/v1.0.0/member/login-token",
      formData,
      config
    )
    .then((response) => {
      console.log(response.data);
      token = response.data;
      setCookie("token", response.data.access_token, { path: "/" });
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return (
    <div>
      <div>로그인 확인!</div>
    </div>
  );
};
export default Loginsession;
