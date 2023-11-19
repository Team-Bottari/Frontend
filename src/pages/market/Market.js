import { Product } from "../../components/market/Product";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { PiWaveSine } from "react-icons/pi";
import dummy from "./data.json";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import HeaderV1 from "../../components/header/HeaderV1";
import HeaderV2 from "../../components/header/HeaderV2";
import React from "react";
import "CSS/market/Marketmain.css";

import axios from "axios";
export const Market = () => {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [itemimg, setItemimg] = useState([]);
  const [blobImg, setBlobImg] = useState([]);
  const [posting_id, setPosting_id] = useState([]);
  const [searchWord, setSeartchword] = useState("");
  const [token, settoken] = useState("");
  const [Cookie] = useCookies(["token"]);
  console.log("Cookie", Cookie);
  console.log("location", location.state);
  console.log("location", location.state === null ? "null" : location.state);
  // setSeartchword("노트북");
  // useEffect(() => {
  //   const FetchData = async () => {
  //     try {
  //       const params = searchWord ? { keyword: searchWord } : {};
  //       const response = await axios.get(
  //         "http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/list/",
  //         { params } /////
  //       );
  //       const items = response.data.items;
  //       console.log("products", response.data);
  //       setProducts(items);

  //       const imgList = [];
  //       const blobFiles = [];

  //       for (let i = 0; i < items.length; i++) {
  //         const posting_id = items[i].posting_id;
  //         setPosting_id(items[i].posting_id);
  //         const posting_images = items[i].posting_images[0];
  //         const imageResponse = await axios.post(
  //           `http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/images/FGlFD4kBg4HIUcUDRVtR/01/standard`,
  //           {},
  //           { responseType: "arraybuffer" }
  //         );
  //         const blob = new Blob([imageResponse.data], { type: "image/jpeg" });
  //         const urlImg = URL.createObjectURL(blob);
  //         console.log("url", urlImg);

  //         imgList.push(urlImg);
  //       }

  //       setItemimg(imgList);
  //       setBlobImg(blobFiles);
  //       console.log("이미지", imgList[0]);
  //       //console.log(imgList, blobFiles);
  //     } catch (error) {
  //       console.error("Failed to fetch data:", error);
  //     }
  //   };

  //   FetchData();
  // }, []);

  // const updatedArray = products.map((item, index) => {
  //   const url = itemimg[index]; // 현재 인덱스에 해당하는 url 값 가져오기
  //   return { ...item, url: url };
  // });
  //console.log("업데이트어레이", updatedArray);
  // function valuetext(value) {
  //   return `${value}원`;
  // }
  // const [value, setValue] = React.useState([20, 37]);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  console.log(typeof dummy.item);
  return (
    <div className="Main">
      {location.state === null || location.state === undefined ? (
        <HeaderV1 />
      ) : (
        <HeaderV2 ID={location.state} />
      )}
      <div className="layoutcontainer">
        {" "}
        <br />
        <div className="mainlayout">
          <div className="select">
            <select className="selectoption" name="option">
              <option value="new">최신순</option>
              <option value="low">낮은가격</option>
              <option value="high">높은가격</option>
            </select>
          </div>
          <br />

          <div className="itembox">
            {
              //updatedArray//
              dummy.item.map((item, index) => (
                <div className="itemlay" key={`product-${index}`}>
                  <Link to={`/marketinfo/${item.posting_id}`}>
                    <Product item={item} />
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
