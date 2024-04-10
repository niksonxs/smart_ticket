import { useEffect } from "react";
import { Routes } from "./Routes";
import "./map.css";

export let map: google.maps.Map;

var { Map } = (await google.maps.importLibrary(
  "maps"
)) as google.maps.MapsLibrary;

export const GoogleMap = () => {
  useEffect(() => {
    const initMap = async () => {
      // const { AdvancedMarkerElement } = (await google.maps.importLibrary(
      //   "marker"
      // )) as google.maps.MarkerLibrary;

      map = new Map(document.getElementById("map")!, {
        center: { lat: 47.01, lng: 28.862 },
        zoom: 14,
        mapId: "trolik",
      });
    };

    initMap();
  }, []);

  return (
    <div className="mapContainer">
      <div id="map" style={{ width: "100%", height: "100vh" }}>
        <Routes />
      </div>
    </div>
  );
};
