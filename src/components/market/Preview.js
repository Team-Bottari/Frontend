import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
/**컴포넌트 */
export const Product = ({ product }) => {
  const [item, setitem] = useState([]);
  useEffect(() => {
    console.log("useEffect");
    async function getItemIMG() {
      try {
        const response = await axios.get(
          `http://wisixicidi.iptime.org:30000/api/v1.0.0/posting/${product.posting_id}/mini`,
          {
            responseType: "arraybuffer",
          }
        );
        const blob = new Blob([response.data], { type: "image/jpeg" });
        setitem(URL.createObjectURL(blob));
      } catch (err) {
        console.log(err);
      }
    }
    getItemIMG();
  }, []);
  return (
    <div>
      <div>
        <img src={item} alt="product" />
      </div>

      <div>
        <span>{product.title}</span>
      </div>

      <div className>
        <span>{product.price}</span>
        <span>원</span>
      </div>
    </div>
  );
};
