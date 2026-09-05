import L from "leaflet";
import { getTipoColorMeta } from "../../utils/publicacionColors";

const iconCache = new Map();

// Pin de color plano en vez del ícono default de Leaflet, para que coincida con
// los colores de acento que ya identifican a cada tipo (perdido/encontrado) en el resto del sitio.
const createPinIcon = (color) =>
  L.divIcon({
    className: "",
    html: `<svg width="26" height="35" viewBox="0 0 26 35" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0C5.8 0 0 5.8 0 13c0 9.7 13 22 13 22s13-12.3 13-22C26 5.8 20.2 0 13 0z" fill="${color}" stroke="#fff" stroke-width="1.5"/>
      <circle cx="13" cy="13" r="5" fill="#fff"/>
    </svg>`,
    iconSize: [26, 35],
    iconAnchor: [13, 35],
    popupAnchor: [0, -32],
  });

export const getTipoIcon = (tipo) => {
  if (!iconCache.has(tipo)) {
    iconCache.set(tipo, createPinIcon(getTipoColorMeta(tipo).accent));
  }
  return iconCache.get(tipo);
};

export const manualPinIcon = createPinIcon("#2a1f19");
