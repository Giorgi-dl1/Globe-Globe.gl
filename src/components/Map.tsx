"use client";

import Globe from "react-globe.gl";

const Map = () => {
  const myData = [
    {
      lat: 29.953204744601763,
      lng: -90.08925929478903,
      altitude: 0.4,
      color: "#00ff33",
    },
    {
      lat: 28.621322361013092,
      lng: 77.20347613099612,
      altitude: 0.4,
      color: "#ff0000",
    },
    {
      lat: -43.1571459086602,
      lng: 172.72338919659848,
      altitude: 0.4,
      color: "#ffff00",
    },
    {
      lat: 42.3154,
      lng: 43.3569,
      altitude: 0.4,
      color: "#000",
    },
  ];
  return (
    <div>
      <Globe
        globeImageUrl={"/textures/00_earthmap1k.jpg"}
        pointsData={myData}
        pointAltitude={0.3}
        pointColor="color"
      />
    </div>
  );
};

export default Map;
