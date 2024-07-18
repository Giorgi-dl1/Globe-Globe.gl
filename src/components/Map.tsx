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
          element.classList.add("element");

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

          return element;
        }}
      />
    </div>
  );
};

export default Map;
