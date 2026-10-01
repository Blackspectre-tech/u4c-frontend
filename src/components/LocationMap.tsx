import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

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

// Wheel zoom is off by default so the page can scroll past the map. It turns on
// after the map is clicked and off again when the cursor leaves.
function WheelZoomOnClick() {
  const map = useMap();

  useEffect(() => {
    const enable = () => map.scrollWheelZoom.enable();
    const disable = () => map.scrollWheelZoom.disable();

    map.on("click", enable);
    map.on("mouseout", disable);

    return () => {
      map.off("click", enable);
      map.off("mouseout", disable);
    };
  }, [map]);

  return null;
}

export default function LocationMap({ country }: LocationMapProps) {
  return (
    <MapContainer
      center={[0, 0]} // temporary center before geocode resolves
      zoom={2}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <SearchAndDisplay query={country} />
      <WheelZoomOnClick />
    </MapContainer>
  );
}
