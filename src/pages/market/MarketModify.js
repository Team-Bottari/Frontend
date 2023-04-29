import MarketPost from "./MarketPost";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const MarketModify = () => {
  const location = useLocation();
  const [marketInfo, setMarketInfo] = useState(location.state.data);
  const [marketImgFile, setMarketImgFile] = useState(location.state.image);
  return (
    <div>
      <MarketPost
        marketInfo={marketInfo}
        marketImgFile={marketImgFile}
        status={"수정"}
      />
    </div>
  );
};
export default MarketModify;
