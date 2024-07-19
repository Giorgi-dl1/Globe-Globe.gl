"use client";

import { useRef } from "react";
import Globe from "react-globe.gl";
import globeJson from "../../public/assets/countries.json";

const Map = () => {
  const globeRef: any = useRef();
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
      zoomIn: false,
    },
    {
      city: "New Delhi",
      lat: 28.621322361013092,
      lng: 77.20347613099612,
      altitude: 0.43,
      color: "#ff0000",
      zoomIn: false,
    },
    {
      city: "New Zealand",
      lat: -43.1571459086602,
      lng: 172.72338919659848,
      altitude: 0.43,
      color: "#ffff00",
      zoomIn: false,
    },
    {
      city: "Georgia",
      lat: 42.3154,
      lng: 43.3569,
      altitude: 0.43,
      color: "#ff0000",
      zoomIn: false,
    },
    {
      city: "Antarctica",
      lat: -88.0,
      lng: 0.0,
      altitude: 0,
      color: "#0000ff",
      zoomIn: true,
    },
  ];

  const zoomIntoView = (lat: number, lng: number) => {
    globeRef.current.pointOfView({ lat: +lat, lng: +lng, altitude: 0.4 }, 2);
  };

  const antartcica = globeJson.features.filter(
    (item) => item.properties.name === "Antarctica"
  );

  return (
    <div>
      <Globe
        polygonsData={antartcica}
        polygonCapColor={(geometry: any) => {
          return ["#0000ff", "#0000cc", "#000099", "#000066"][
            geometry.properties.abbrev_len % 4
          ];
        }}
        polygonSideColor={(geometry: any) => {
          return ["#0000ff", "#0000cc", "#000099", "#000066"][
            geometry.properties.abbrev_len % 4
          ];
        }}
        ref={globeRef}
        globeImageUrl={"/textures/8081_earthmap10k.jpg"}
        pointsData={pointsData}
        pointAltitude={0.3}
        pointColor="color"
        htmlElementsData={markersData}
        htmlAltitude="altitude"
        htmlElement={(data: any) => {
          const { city, color, zoomIn, lat, lng } = data;
          const element = document.createElement("div");
          element.style.color = color;
          element.classList.add("element");

          if (zoomIn) {
            element.innerHTML = `
              <div class="relative pin-wrapper">
                <div class="pin">
                </div>
                <img class="pointer" src="/assets/pin-pointer.svg" alt="pointer" />
                <div class="pin-content-wrapper">
                  <div class="pin-content">
                    <img src="/textures/glacier.jpg" alt="glacier" />
                    <h3>THE Princess <br> Elisabeth <br> Antarctica</h3>
                  </div>
                </div>
              </div>
            `;
            element.addEventListener("click", () => zoomIntoView(lat, lng));
          } else {
            // Create the HTML content
            element.innerHTML = `
            <div class="popup-wrapper">
              <strong class="label" style="font-size:10px;text-align:center">${city}</strong>
              <div class="popup-content">
                <div class="sub-link">
                  <div class="h3">expedition</div>
                  <a href="#" class="h3">go to link</a>
                </div>
                <h2>1988 EXPEDITION</h2>
                <div class="text-content">In 1997-1998, Alain Hubert and Dixie Dansercoer undertook a record breaking expedition of 3924 km in 99 days. Cutting across the continent from Princess Ranghild Mountain to the American base at McMurdo Sound, they became the first explorers to cross Antarctica without outside assistance. While breaking several other records (longest crossing, achieving over 100 kilometers in a day on foot and by ski),</div>
                <img src="/textures/cat.webp" />
              </div>
            </div>`;

            // Attach click event listener to the <strong> element with class "label"
            const labelElement = element.querySelector(".label");
            if (labelElement) {
              labelElement.addEventListener("click", (e) => {
                const activeElement = document.querySelector(".element.active");
                const activePopup = activeElement?.querySelector(".active");

                const target = e.target;
                //@ts-ignore
                const nextSibling = target.nextElementSibling;
                element.classList.toggle("active");
                nextSibling.classList.toggle("active");

                if (activeElement !== nextSibling) {
                  activeElement?.classList.remove("active");
                  activePopup?.classList.remove("active");
                }
              });
            }
          }

          return element;
        }}
      />
    </div>
  );
};

export default Map;
