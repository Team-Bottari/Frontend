import { Route, Routes } from "react-router-dom";
import Market from "../pages/market/Market";
import MarketPost from "../pages/market/MarketPost";
import MarketModify from "../pages/market/MarketModify";
function MarketRouting() {
  return (
    <Routes>
      <Route path="/Market" element={<Market />} />
      <Route path="/MarketPost" element={<MarketPost />} />
      <Route path="/MarketModify" element={<MarketModify />} />
    </Routes>
  );
}

export default MarketRouting;
