"use client";

import { useRef } from "react";
import Globe from "react-globe.gl";
import globeJson from "../../public/assets/countries.json";
import * as turf from "@turf/turf";

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
      closeView: false,
      personInfo: false,
      isBase: false,
    },
    {
      city: "New Delhi",
      lat: 28.621322361013092,
      lng: 77.20347613099612,
      altitude: 0.43,
      color: "#ff0000",
      zoomIn: false,
      closeView: false,
      personInfo: false,
      isBase: false,
    },
    {
      city: "New Zealand",
      lat: -43.1571459086602,
      lng: 172.72338919659848,
      altitude: 0.43,
      color: "#ffff00",
      zoomIn: false,
      closeView: false,
      personInfo: false,
      isBase: false,
    },
    {
      city: "Georgia",
      lat: 42.3154,
      lng: 43.3569,
      altitude: 0.43,
      color: "#ff0000",
      zoomIn: false,
      closeView: false,
      personInfo: false,
      isBase: false,
    },
    {
      city: "Antarctica",
      lat: -88.0,
      lng: 0.0,
      altitude: 0,
      color: "#0000ff",
      zoomIn: true,
      closeView: false,
      personInfo: false,
      isBase: false,
    },
    {
      city: "Antarctica",
      lat: -80.0,
      lng: -5.0,
      altitude: 0,
      color: "#0000ff",
      zoomIn: false,
      closeView: true,
      personInfo: true,
      isBase: false,
    },
    {
      city: "Antarctica",
      lat: -75.0,
      lng: 45.0,
      altitude: 0,
      color: "#0000ff",
      zoomIn: false,
      closeView: true,
      personInfo: false,
      isBase: true,
    },
  ];

  const smallPointsView = 0.75;

  const zoomIntoView = (lat: number, lng: number) => {
    globeRef.current.pointOfView(
      { lat: +lat, lng: +lng, altitude: smallPointsView },
      1500
    );
  };

  const zoomHandler = ({ lat, lng, altitude }: any) => {
    const point = turf.point([lng, lat]);

    for (const country of (globeJson as any).features) {
      if (country.geometry.type === "Polygon") {
        const countryPolygon = turf.polygon(country.geometry.coordinates);
        if (turf.booleanPointInPolygon(point, countryPolygon)) {
          console.log(`User zoomed in on: ${country.properties.name}`);
          // return country.properties.name;
        }
      } else if (country.geometry.type === "MultiPolygon") {
        for (const coordinates of country.geometry.coordinates) {
          const countryPolygon = turf.polygon(coordinates);
          if (turf.booleanPointInPolygon(point, countryPolygon)) {
            console.log(`User zoomed in on: ${country.properties.name}`);
            // return country.properties.name;
          }
        }
      }
    }

    const closeViewPoints = document.querySelectorAll(".close-view");
    const bigPoints = document.querySelectorAll(".far-view");

    if (altitude <= smallPointsView + 0.05) {
      bigPoints.forEach((point) => point.classList.add("hidden"));
      closeViewPoints.forEach((point) => point.classList.remove("hidden"));
    } else {
      bigPoints.forEach((point) => point.classList.remove("hidden"));
      closeViewPoints.forEach((point) => point.classList.add("hidden"));
    }

    console.log("No country found at the given coordinates.");
    return null;
  };

  // const antartcica = globeJson.features.filter(
  //   (item) => item.properties.name === "Antarctica"
  // );

  return (
    <div>
      <Globe
        onZoom={zoomHandler}
        atmosphereAltitude={0.15}
        showAtmosphere={true}
        // polygonsData={antartcica}
        // polygonCapColor={(geometry: any) => {
        //   return ["#0000ff", "#0000cc", "#000099", "#000066"][
        //     geometry.properties.abbrev_len % 4
        //   ];
        // }}
        // polygonSideColor={(geometry: any) => {
        //   return ["#0000ff", "#0000cc", "#000099", "#000066"][
        //     geometry.properties.abbrev_len % 4
        //   ];
        // }}
        ref={globeRef}
        globeImageUrl={"/textures/8081_earthmap10k.jpg"}
        pointsData={pointsData}
        pointAltitude={0.3}
        pointColor="color"
        htmlElementsData={markersData}
        htmlAltitude="altitude"
        htmlElement={(data: any) => {
          const {
            city,
            color,
            zoomIn,
            lat,
            lng,
            closeView,
            personInfo,
            isBase,
          } = data;
          const element = document.createElement("div");
          element.style.color = color;
          element.classList.add("element");

          if (!closeView) {
            element.classList.add("far-view");
          } else {
            element.classList.add("close-view");
          }

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
            // Check the pin type and create needed html content
            if (isBase) {
              element.innerHTML = `
              <div class="popup-wrapper base-pin-wrapper">
                <div class="relative label base-label">
                  <div class="pin orange">
                  </div>
                  <div class="text-label-toggle active">
                    <img class="pointer" src="/assets/pin-pointer-orange.svg" alt="pointer" />
                    <div class="active">
                      <div class="base-name">
                        beyond epica
                      </div>
                    </div>
                  </div>
                </div>

                <div class="popup-content">
                  <div class="sub-link">
                    <div class="h3">Baillet Latour Antarctica Fellowship</div>
                    <a href="#" class="h3">full online report</a>
                  </div>
                  <h2>Dr Kate Winter</h2>
                  <div class="text-content">In 1997-1998, Alain Hubert and Dixie Dansercoer undertook a record breaking expedition of 3924 km in 99 days. Cutting across the continent from Princess Ranghild Mountain to the American base at McMurdo Sound, they became the first explorers to cross Antarctica without outside assistance. While breaking several other records (longest crossing, achieving over 100 kilometers in a day on foot and by ski),</div>
                  <img src="/textures/cat.webp" />
                </div>
              </div>
            `;
            } else if (personInfo) {
              element.innerHTML = `
              <div class="popup-wrapper person-pin-wrapper">
                <div class="relative label">
                  <img src="/assets/pin-person.svg" alt="Pin" />
                  <div class="name-wrapper text-label-toggle active">
                    <img class="pointer" src="/assets/pin-pointer-orange.svg" alt="pointer" />
                    <div class="name">
                      dr. kate<br>winter
                    </div>
                  </div>
                </div>

                <div class="popup-content">
                  <div class="sub-link">
                    <div class="h3">Baillet Latour Antarctica Fellowship</div>
                    <a href="#" class="h3">full online report</a>
                  </div>
                  <h2>Dr Kate Winter</h2>
                  <div class="text-content">In 1997-1998, Alain Hubert and Dixie Dansercoer undertook a record breaking expedition of 3924 km in 99 days. Cutting across the continent from Princess Ranghild Mountain to the American base at McMurdo Sound, they became the first explorers to cross Antarctica without outside assistance. While breaking several other records (longest crossing, achieving over 100 kilometers in a day on foot and by ski),</div>
                  <img src="/textures/cat.webp" />
                </div>
              </div>
            `;
            } else {
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
            }

            // Attach click event listener to the <strong> element with class "label"
            const labelElement = element.querySelector(".label");
            if (labelElement) {
              labelElement.addEventListener("click", (e: any) => {
                const activeElement = document.querySelector(".element.active");
                const activePopup = activeElement?.querySelector(
                  ".popup-content.active"
                );

                const target = e.target.closest(".label") || e.target;
                //@ts-ignore
                const newActiveElement = target.nextElementSibling;
                element.classList.toggle("active");
                newActiveElement.classList.toggle("active");

                let nameWrapper = target
                  .closest(".element")
                  .querySelector(".text-label-toggle");

                if (nameWrapper) {
                  nameWrapper.classList.toggle("active");
                }
                console.log(activeElement);
                if (activeElement !== newActiveElement) {
                  activeElement?.classList.remove("active");
                  activePopup?.classList.remove("active");
                  const activeNameWrapper =
                    activeElement?.querySelector(".text-label-toggle");
                  if (activeNameWrapper) {
                    activeNameWrapper.classList.add("active");
                  }
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
