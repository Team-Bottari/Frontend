import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "CSS/members/Location.css";
import HeaderV2 from "components/header/HeaderV2";
const { kakao } = window;
const Location = () => {
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state; //해당 이메일로 위치 정보 업데이트
  const [locatoin, setLocation] = useState({ latitude: 0, longitude: 0 }); //위도, 경도
  const [userLocation, setUserLocation] = useState({ location: "" });
  const [nearLocation, setNearLocation] = useState([]);
  const [userRadius, setRadius] = useState(4000);
  let geocoder = new kakao.maps.services.Geocoder(); //사용자 주소 좌표-주소 변환
  useEffect(() => {
    const container = document.getElementById("map");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationAccess, locationError);
    }
    const options = {
      center: new kakao.maps.LatLng(locatoin.latitude, locatoin.longitude),
      level: 7,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, []);
  const locationAccess = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({
      latitude: latitude,
      longitude: longitude,
    });

    searchNearbyAddresses(latitude, longitude);
    let coord = new kakao.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setUserLocation({
          location: `${result[0].address.region_1depth_name} ${result[0].address.region_2depth_name} ${result[0].address.region_3depth_name}`,
        });
      }
    };
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback); //현재 사용자 주소
  };
  const createCircle = (center) => {
    const circle = new kakao.maps.Circle({
      center,
      radius: userRadius, // 단위: 미터 (원의 크기를 조절할 수 있습니다.)
      strokeWeight: 1,
      strokeColor: "grey",
      strokeOpacity: 0.8,
      fillColor: "grey",
      fillOpacity: 0.3,
    });
    circle.setMap(map);
  };
  useEffect(() => {
    // map 상태가 변경될 때마다 원의 위치를 업데이트
    if (map) {
      const center = new kakao.maps.LatLng(
        locatoin.latitude,
        locatoin.longitude
      );
      map.setCenter(center);
      createCircle(center);
    }
  }, [map, locatoin]);
  const searchNearbyAddresses = async (latitude, longitude) => {
    const options = {
      location: new kakao.maps.LatLng(latitude, longitude),
      radius: userRadius,
      sort: kakao.maps.services.SortBy.DISTANCE,
    };
    const placesService = new kakao.maps.services.Places();
    try {
      const result = await new Promise((resolve, reject) => {
        placesService.keywordSearch(
          "지방행정기관",
          (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              resolve(result);
            } else {
              reject(new Error("검색에 실패했습니다."));
            }
          },
          options
        );
      });
      const centerLatLng = new kakao.maps.LatLng(latitude, longitude);
      const radius = userRadius / 1000;
      const tempList = result.filter((item) => {
        const lat = item.y;
        const lng = item.x;
        const distance = calculateDistance(
          centerLatLng.getLat(),
          centerLatLng.getLng(),
          lat,
          lng
        );
        return distance <= radius; // 해당 주소가 원의 반지름 내에 있는지 확인
      });
      const nearbyAddresses = [];
      for (var i = 0; i < 15; i++) {
        let cityName = tempList[i].address_name
          .split(" ")
          .filter((item) => item !== "")
          .slice(0, 3)
          .join(" ");
        if (!nearbyAddresses.includes(cityName)) {
          nearbyAddresses.push(cityName);
        }
      }
      await setNearLocation(nearbyAddresses);
    } catch (error) {
      console.error(error.message);
    }
  };
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    //거리계산 메소드
    const R = 6371; // 지구 반지름 (단위: km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance; // 두 좌표 간의 거리를 반환 (단위: km)
  };
  const locationError = () => {
    console.log("error");
    setLocation({
      latitude: 33.450701,
      longitude: 126.570667,
    });
  };
  const LocationChange = (address) => {
    console.log(address);
    setUserLocation({ location: address });
  };
  const LocationConfirm = (event) => {
    event.preventDefault();
    console.log(userLocation);

    //위치 업로드 함수 및 페이지 이동 함수
    navigate("/Mypage");
  };
  return (
    <div>
      <div className="Locatoin_Top"></div>
      <div className="Location">
        <div id="map" className="Map"></div>
        <div className="loc">
          <p className="currentL">{userLocation.location}</p>
          <p className="warn">
            주변 위치를 재설정하고 싶으시다면 목록에서 선택해주세요
          </p>
          <br />
          {nearLocation.map((address, index) => (
            <div key={index}>
              <hr />
              <button
                className="addressBTN"
                onClick={() => LocationChange(address)}
              >
                {address}
              </button>
            </div>
          ))}
          <hr />
          <br />
          <button className="LocationConfirm" onClick={LocationConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
export default Location;
