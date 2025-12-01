import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for missing marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

interface LocationMapProps {
  country: string; // e.g. "Lagos, Nigeria" or "California, USA"
}

function SearchAndDisplay({ query }: { query: string }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    provider.search({ query }).then((results: any) => {
      if (results.length > 0) {
        const { x, y, label } = results[0]; // x=lon, y=lat
        map.setView([y, x], 10);
        L.marker([y, x]).addTo(map).bindPopup(label).openPopup();
      }
    });
  }, [query, map]);

  return null;
}

export default function LocationMap({ country }: LocationMapProps) {
  return (
    <MapContainer
      center={[0, 0]} // temporary center before geocode resolves
      zoom={2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <SearchAndDisplay query={country} />
    </MapContainer>
  );
}
