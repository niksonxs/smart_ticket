//this react component should import map from Map.tsx and use it to display markers on the map
/// <reference types="@types/google.maps" />

import { useEffect, useState } from "react";
import "./map.css";
import { map } from "./Map";
import axios from "axios";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface VehiclePosition {
  id: string;
  label: string;
  latitude?: number;
  longitude?: number;
  timestamp: any;
  vehicle_type: VehicleType;
  bike_accessible: BikeAccessibility;
  wheelchair_accessible: WheelchairAccessibility;
  x_provider: string;
  x_rand: number;
  speed: number;
  route_id: number;
  trip_id?: string;
}

enum VehicleType {
  Tram = 0,
  Subway = 1,
  Rail = 2,
  Bus = 3,
  Ferry = 4,
  CableTram = 5,
  AerialLift = 6,
  Funicular = 7,
  Trolleybus = 11,
  Monorail = 12,
}

enum BikeAccessibility {
  UNKNOWN = "UNKNOWN",
  BIKE_INACCESSIBLE = "BIKE_INACCESSIBLE",
  BIKE_ACCESSIBLE = "BIKE_ACCESSIBLE",
}

enum WheelchairAccessibility {
  NO_VALUE = "NO_VALUE",
  UNKNOWN = "UNKNOWN",
  WHEELCHAIR_ACCESSIBLE = "WHEELCHAIR_ACCESSIBLE",
  WHEELCHAIR_INACCESSIBLE = "WHEELCHAIR_INACCESSIBLE",
}

var { AdvancedMarkerElement } = (await google.maps.importLibrary(
  "marker"
)) as google.maps.MarkerLibrary;

var markers: google.maps.marker.AdvancedMarkerElement[] = [];

export const Routes = () => {
  const [routes, setRoutes] = useState<VehiclePosition[]>([]);
  let cluster: MarkerClusterer = new MarkerClusterer({ map, markers });

  const prepareRoutes = async (routes: VehiclePosition[]) => {
    markers.forEach((marker) => (marker.map = null));
    cluster?.clearMarkers();
    markers = (await Promise.all(
      routes.map(async (route: VehiclePosition) => {
        if (route.latitude && route.longitude && route.route_id) {
          const routeMarker = document.createElement("div");
          routeMarker.className = "route";
          routeMarker.textContent = route.route_id.toString();

          if (route.vehicle_type === VehicleType.Bus) {
            routeMarker.style.backgroundColor = "green";
          }
          if (route.vehicle_type === VehicleType.Trolleybus) {
            routeMarker.style.backgroundColor = "blue";
          }
          return new AdvancedMarkerElement({
            position: { lat: route.latitude, lng: route.longitude },
            map,
            content: routeMarker,
          });
        }
      })
    ).then((markers) =>
      markers.filter((marker) => marker !== undefined)
    )) as any;

    cluster.addMarkers(markers);
  };

  useEffect(() => {
    prepareRoutes(routes);
  }, [routes]);

  const url = "https://api.tranzy.dev/v1/opendata/vehicles";

  useEffect(() => {
    const headers = {
      "X-API-KEY": "0CTFfFOWaK4AUkp3CiZZb7LGmpRqwGqwamtsHWx8",
      "X-Agency-Id": "4",
    };
    setInterval(() => {
      axios.get(url, { headers }).then((response) => {
        setRoutes(response.data);
      });
    }, 5000);
  }, []);

  return <></>;
};
