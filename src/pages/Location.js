/*import React, { useEffect, useState } from "react";
const { kakao } = window;
const Location = () => {
  const [map, setMap] = useState(null);
  useEffect(() => {
    const container = document.getElementById("map");
    const options = { center: new kakao.maps.LatLng(33.450701, 126.570667) };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "99%", height: "500px" }}></div>
    </div>
  );
};*/
export default Location;
