import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import Seo from "../../../components/seo/Seo";
import MapaBase from "../../../components/map/MapaBase";
import { TUCUMAN_CENTER } from "../../../components/map/mapConstants";
import { getTipoIcon } from "../../../components/map/leafletIcons";
import { publicacionesService } from "../../../services/publicaciones";
import { getPublicacionDetailPath } from "../utils/publicacionPaths";
import { getCloudinaryUrl } from "../../../utils/cloudinaryUtils";
import LoadingState from "../../../components/ui/LoadingState";
import { buildBreadcrumbSchema } from "../../../components/seo/seoUtils";

const MapaPublicacionesPage = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [perdidos, encontrados] = await Promise.all([
        publicacionesService.getPublicacionesActivasPorTipo("PERDIDO"),
        publicacionesService.getPublicacionesActivasPorTipo("ENCONTRADO"),
      ]);

      if (cancelled) return;
      setPublicaciones([...perdidos, ...encontrados]);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const conUbicacion = useMemo(
    () => publicaciones.filter((publicacion) => publicacion.ubicacionPublica?.coordinates),
    [publicaciones],
  );

  return (
    <div className="bg-[#f6efe4] text-[#241914]">
      <Seo
        title="Mapa de casos"
        description="Mapa con animales perdidos y encontrados activos, geolocalizados de forma aproximada por privacidad."
        path="/mapa"
        structuredData={[
          buildBreadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Mapa de casos", path: "/mapa" },
          ]),
        ]}
      />
      <Navbar />

      <div className="px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-26 sm:px-6 sm:pt-30 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-5 max-w-2xl">
            <h1 className="font-editorial text-[2.1rem] leading-[0.96] sm:text-[2.6rem]">
              Mapa de casos
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#5f4c41]">
              Animales perdidos y encontrados activos cerca tuyo. Por privacidad, cada pin
              muestra una ubicación aproximada y no la dirección exacta reportada.
            </p>
          </div>

          {loading ? (
            <LoadingState label="Cargando mapa..." />
          ) : (
            <MapaBase
              center={TUCUMAN_CENTER}
              zoom={12}
              className="h-[70vh] min-h-[420px] w-full overflow-hidden rounded-[1rem] border border-[#2f241d]/10 shadow-sm"
            >
              {conUbicacion.map((publicacion) => {
                const [lng, lat] = publicacion.ubicacionPublica.coordinates;
                const img = publicacion.imgs?.[0] || publicacion.img;

                return (
                  <Marker
                    key={publicacion._id}
                    position={[lat, lng]}
                    icon={getTipoIcon(publicacion.tipo)}
                  >
                    <Popup>
                      <div className="w-40">
                        {img && (
                          <img
                            src={getCloudinaryUrl(img, { width: 160 })}
                            alt=""
                            className="mb-2 h-24 w-full rounded object-cover"
                          />
                        )}
                        <p className="text-sm font-bold text-[#241914]">
                          {publicacion.nombreanimal || publicacion.especie}
                        </p>
                        <Link
                          to={getPublicacionDetailPath(publicacion)}
                          className="text-xs font-semibold text-[#d46f49] underline"
                        >
                          Ver caso
                        </Link>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MapaBase>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MapaPublicacionesPage;
