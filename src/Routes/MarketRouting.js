import { Route, Routes } from "react-router-dom";
import Market from "../pages/market/Market";
import MarketPost from "../pages/market/MarketPost";
function MarketRouting() {
  return (
    <Routes>
      <Route path="/Market" element={<Market />} />
      <Route path="/MarketPost" element={<MarketPost />} />
    </Routes>
  );
}

export default MarketRouting;
