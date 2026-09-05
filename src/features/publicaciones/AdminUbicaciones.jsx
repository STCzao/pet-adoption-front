import React, { useCallback, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
import { Marker, useMapEvents } from "react-leaflet";
import ModalShell from "../../components/ui/ModalShell";
import LoadingState from "../../components/ui/LoadingState";
import MapaBase from "../../components/map/MapaBase";
import { TUCUMAN_CENTER } from "../../components/map/mapConstants";
import { manualPinIcon } from "../../components/map/leafletIcons";
import { adminService } from "../../services/admin";
import { publicacionesService } from "../../services/publicaciones";

let modalControl;

const formatFecha = (value) => (value ? new Date(value).toLocaleDateString() : "Sin fecha");

const ClickParaUbicar = ({ onSelect }) => {
  useMapEvents({
    click(event) {
      onSelect({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });
  return null;
};

const FilaPendiente = ({ publicacion, onGuardado }) => {
  const [expandido, setExpandido] = useState(false);
  const [coords, setCoords] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const handleGuardar = async () => {
    if (!coords) return;

    setGuardando(true);
    setError("");

    const result = await publicacionesService.establecerUbicacionManual(publicacion._id, coords);

    if (result?.success) {
      onGuardado(publicacion._id);
    } else {
      setError(result?.msg || "No se pudo guardar la ubicación");
    }

    setGuardando(false);
  };

  return (
    <div className="rounded-[1rem] border border-[color:var(--shell-line)] bg-white/70 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="rounded-full bg-[color:var(--shell-surface-soft)] px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-[color:var(--shell-bark)]">
            {publicacion.tipo}
          </span>
          <p className="mt-1.5 text-sm font-semibold text-[color:var(--shell-ink)]">
            {publicacion.lugar || "Sin dirección cargada"}
          </p>
          <p className="text-xs text-[color:var(--shell-muted)]">
            {[publicacion.localidad, formatFecha(publicacion.fechaCreacion)].filter(Boolean).join(" · ")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setExpandido((value) => !value)}
          className="cursor-pointer rounded-full border border-[color:var(--shell-line)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--shell-ink)] transition-colors hover:bg-[color:var(--shell-surface-soft)]"
        >
          {expandido ? "Cerrar" : "Cargar ubicación"}
        </button>
      </div>

      {expandido && (
        <div className="mt-4">
          <p className="mb-2 text-xs text-[color:var(--shell-muted)]">
            Tocá el mapa en el punto correcto para fijar el pin.
          </p>
          <MapaBase
            center={TUCUMAN_CENTER}
            zoom={13}
            className="h-64 w-full overflow-hidden rounded-[0.8rem] border border-[color:var(--shell-line)]"
          >
            <ClickParaUbicar onSelect={setCoords} />
            {coords && <Marker position={[coords.lat, coords.lng]} icon={manualPinIcon} />}
          </MapaBase>

          {error && <p className="mt-2 text-sm text-[#a44939]">{error}</p>}

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={handleGuardar}
              disabled={!coords || guardando}
              className="cursor-pointer rounded-full bg-[color:var(--shell-bark)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#45362d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Guardar ubicación"}
            </button>
            {coords && (
              <span className="text-xs text-[color:var(--shell-muted)]">
                {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const AdminUbicaciones = {
  openModal: () => {
    if (!modalControl) return false;
    modalControl.setOpen(true);
    return true;
  },

  Component: React.memo(() => {
    const [open, setOpen] = useState(false);
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useLayoutEffect(() => {
      modalControl = { setOpen };
      return () => {
        modalControl = null;
      };
    }, []);

    const cargar = useCallback(async (targetPage = 1) => {
      setLoading(true);
      setError("");

      const result = await adminService.getPublicacionesPendientesUbicacion(targetPage, 20);

      if (result?.success) {
        setPublicaciones(result.publicaciones);
        setTotalPages(result.totalPages);
        setPage(result.page);
      } else {
        setError(result?.msg || "No se pudo obtener el listado");
      }

      setLoading(false);
    }, []);

    useLayoutEffect(() => {
      if (open) cargar(1);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    const handleGuardado = (id) => {
      setPublicaciones((prev) => prev.filter((publicacion) => publicacion._id !== id));
    };

    const handleClose = () => {
      setOpen(false);
      setPublicaciones([]);
      setError("");
      setPage(1);
      setTotalPages(1);
    };

    if (!open) return null;

    return (
      <ModalShell>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-[1.5rem] border border-[color:var(--shell-line)] bg-[linear-gradient(180deg,rgba(255,250,244,0.98),rgba(248,240,229,0.96))] p-6 shadow-[0_28px_70px_rgba(36,25,20,0.12)] sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-[color:var(--shell-ink)]">
                Ubicaciones pendientes
              </h1>
              <p className="mt-1 text-sm text-[color:var(--shell-muted)]">
                Publicaciones de perdido/encontrado sin ubicación cargada.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="cursor-pointer text-[color:var(--shell-muted)] transition-colors hover:text-[color:var(--shell-accent-strong)]"
              aria-label="Cerrar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-[1rem] border border-[#d62828]/18 bg-[color:var(--shell-danger-soft)] p-3">
              <p className="text-[#a44939]">{error}</p>
            </div>
          )}

          <div className="mt-5 flex flex-col gap-3">
            {loading ? (
              <LoadingState label="Cargando..." compact />
            ) : publicaciones.length === 0 ? (
              <p className="rounded-[1rem] border border-[color:var(--shell-line)] bg-white/60 p-4 text-center text-sm text-[color:var(--shell-muted)]">
                No hay publicaciones pendientes de ubicación.
              </p>
            ) : (
              publicaciones.map((publicacion) => (
                <FilaPendiente
                  key={publicacion._id}
                  publicacion={publicacion}
                  onGuardado={handleGuardado}
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => cargar(page - 1)}
                disabled={page <= 1 || loading}
                className="cursor-pointer rounded-full border border-[color:var(--shell-line)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--shell-ink)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Anterior
              </button>
              <span className="text-sm text-[color:var(--shell-muted)]">
                Página {page} de {totalPages}
              </span>
              <button
                type="button"
                onClick={() => cargar(page + 1)}
                disabled={page >= totalPages || loading}
                className="cursor-pointer rounded-full border border-[color:var(--shell-line)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--shell-ink)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Siguiente
              </button>
            </div>
          )}
        </motion.div>
      </ModalShell>
    );
  }),
};
