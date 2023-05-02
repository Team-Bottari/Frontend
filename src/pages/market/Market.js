/**화면에 뜨는 메인페이지 */
import { Product } from "../../components/market/Preview";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import axios from "axios";

const Main = ({}) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/list")
      .then((data) => {
        setProducts(data.data.items);
      });
  }, [setProducts]);

  return (
    <>
      <div>
        <button>작성하기</button>
        <button>가격</button>
        <select name="option">
          <option value="1">최신순 </option>
          <option value="2">저가순 </option>
          <option value="3">고가순 </option>
        </select>
      </div>
      <main>
        {products.map((product, index) => {
          return <Product key={`key-${index}`} product={products[index]} />;
        })}
      </main>
    </>
  );
};
export default Main;
