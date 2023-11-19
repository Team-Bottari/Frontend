import { Route, Routes } from "react-router-dom";
import Market from "../pages/market/Market";
import MarketPost from "../pages/market/MarketPost";
import MarketModify from "../pages/market/MarketModify";
import MarketInfo from "../pages/market/MarketInfo";
function MarketRouting() {
  return (
    <Routes>
      <Route path="/Market" element={<Market />} />
      <Route path="/MarketPost" element={<MarketPost />} />
      <Route path="/MarketModify" element={<MarketModify />} />
      <Route path="/marketinfo/:postingId" element={<MarketInfo />} />
    </Routes>
  );
}

export default MarketRouting;
