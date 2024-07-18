"use client";

import Globe from "react-globe.gl";

const Map = () => {
  const pointsData = [
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
      color: "#ff0000",
    },
  ];

  const markersData = [
    {
      city: "New Orleans",
      lat: 29.953204744601763,
      lng: -90.08925929478903,
      altitude: 0.43,
      color: "#00ff33",
    },
    {
      city: "New Delhi",
      lat: 28.621322361013092,
      lng: 77.20347613099612,
      altitude: 0.43,
      color: "#ff0000",
    },
    {
      city: "New Zealand",
      lat: -43.1571459086602,
      lng: 172.72338919659848,
      altitude: 0.43,
      color: "#ffff00",
    },
    {
      city: "Georgia",
      lat: 42.3154,
      lng: 43.3569,
      altitude: 0.43,
      color: "#ff0000",
    },
  ];

  return (
    <div>
      <Globe
        globeImageUrl={"/textures/00_earthmap1k.jpg"}
        pointsData={pointsData}
        pointAltitude={0.3}
        pointColor="color"
        htmlElementsData={markersData}
        htmlAltitude="altitude"
        htmlElement={(data: any) => {
          const { city, color } = data;
          const element = document.createElement("div");
          element.style.color = color;
          element.innerHTML = `
          <div>
            <strong style="font-size:10px;text-align:center">${city}</strong>
          </div>`;
          return element;
        }}
      />
    </div>
  );
};

export default Map;
