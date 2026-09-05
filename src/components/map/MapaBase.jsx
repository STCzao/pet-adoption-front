import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TUCUMAN_CENTER } from "./mapConstants";

const MapaBase = ({
  center = TUCUMAN_CENTER,
  zoom = 13,
  className = "",
  children,
  ...mapProps
}) => (
  <div className={className}>
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      {...mapProps}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  </div>
);

export default MapaBase;
