import React, { useEffect, useState } from "react";
import "CSS/members/Location.css";
import HeaderV2 from "components/header/HeaderV2";
const { kakao } = window;
const Location = () => {
  const [map, setMap] = useState(null);
  const [locatoin, setLocation] = useState({ latitude: 0, longitude: 0 }); //위도, 경도
  const [userLocation, setUserLocation] = useState({ location: "" });
  const [nearLocation, setNearLocation] = useState([{ location: "" }]);
  const [userRadius, setRadius] = useState(4000);
  let geocoder = new kakao.maps.services.Geocoder(); //사용자 주소 좌표-주소 변환

  useEffect(() => {
    const container = document.getElementById("map");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(locationAccess, locationError);
    }
    const options = {
      center: new kakao.maps.LatLng(locatoin.latitude, locatoin.longitude),

      center: new kakao.maps.LatLng(35.43586881223756, 126.7018554252071),
      level: 7,
    };
    const kakaoMap = new kakao.maps.Map(container, options);
    setMap(kakaoMap);
    kakao.maps.load(() => {
      searchNearbyAddresses();
    });
  }, []);

  const locationAccess = (position: any) => {
    setLocation({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
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
    /*
    setLocation({
      latitude: 35.43586881223756,
      longitude: 126.7018554252071,
    });*/
  };
  const createCircle = (center) => {
    const circle = new kakao.maps.Circle({
      center,
      radius: userRadius, // 단위: 미터 (원의 크기를 조절할 수 있습니다.)
      strokeWeight: 1,
      strokeColor: "#b785d5db",
      strokeOpacity: 0.8,
      fillColor: "#b785d5db",
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

  //원 안에 해당하는 주소 목록 가져오기
  const searchNearbyAddresses = (center) => {
    const options = {
      location: new kakao.maps.LatLng(locatoin.latitude, locatoin.longitude),
      radius: userRadius,
      sort: kakao.maps.services.SortBy.DISTANCE,
    };
    const placesService = new kakao.maps.services.Places();
    placesService.keywordSearch(
      "우체국",
      (result, status) => {
        console.log("결과:", result);
        if (status === kakao.maps.services.Status.OK) {
          const centerLatLng = new kakao.maps.LatLng(
            locatoin.latitude,
            locatoin.longitude
          );
          const radius = userRadius / 1000;
          const nearbyAddresses = result.filter((item) => {
            const lat = item.y;
            const lng = item.x;
            // 원의 중심과 해당 주소의 거리를 계산합니다.
            const distance = calculateDistance(
              centerLatLng.getLat(),
              centerLatLng.getLng(),
              lat,
              lng
            );
            // 해당 주소가 원의 반지름 내에 있는지 확인합니다.
            return distance <= radius;
          });

          console.log("필터링결과:", nearbyAddresses);
          setNearLocation(nearbyAddresses);
        } else {
          console.error("검색에 실패했습니다.");
        }
      },
      options
    );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    //거리계산 메소드
    const R = 6371; // 지구의 반지름 (단위: km)

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

  return (
    <div>
      <HeaderV2 ID={""} />
      <div className="Locatoin_Top"></div>
      <div className="Location">
        <div id="map" className="Map"></div>
        <div>
          {userLocation.location}
          <br />
          근처 보기
        </div>
      </div>
    </div>
  );
};
export default Location;
