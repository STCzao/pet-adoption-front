import { useState, useEffect } from "react";
import { publicacionesService } from "../../../services/publicaciones";
import {
  PUBLICACION_SIZE_FIELD,
  getPublicacionTamano,
} from "../utils/publicacionFields";

const initialFormState = {
  nombreanimal: "",
  especie: "",
  tipo: "",
  raza: "",
  localidad: "",
  lugar: "",
  fecha: "",
  sexo: "",
  [PUBLICACION_SIZE_FIELD]: "",
  color: "",
  edad: "",
  detalles: "",
  afinidad: "",
  afinidadanimales: "",
  energia: "",
  castrado: false,
  whatsapp: "",
  imgs: [],
  lat: null,
  lng: null,
};

/**
 * Hook personalizado para gestionar el estado del formulario de publicaciones
 */
export const usePublicacionForm = (editData) => {
  const [razasPorEspecie, setRazasPorEspecie] = useState({});
  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [capturandoUbicacion, setCapturandoUbicacion] = useState(false);
  const [errorUbicacion, setErrorUbicacion] = useState("");

  useEffect(() => {
    publicacionesService.getRazas().then((res) => {
      if (res.razasPorEspecie) setRazasPorEspecie(res.razasPorEspecie);
    });
  }, []);

  useEffect(() => {
    if (!editData) {
      setForm(initialFormState);
      setErrors({});
      return;
    }

    setForm({
      nombreanimal:
        editData.tipo === "PERDIDO" || editData.tipo === "ADOPCION"
          ? editData.nombreanimal || ""
          : "",
      edad:
        editData.tipo === "PERDIDO" || editData.tipo === "ADOPCION"
          ? editData.edad || ""
          : "",
      especie: editData.especie || "",
      tipo: editData.tipo || "",
      raza: editData.raza || "",
      localidad:
        editData.tipo === "PERDIDO" || editData.tipo === "ENCONTRADO"
          ? editData.localidad || ""
          : "",
      lugar:
        editData.tipo === "PERDIDO" || editData.tipo === "ENCONTRADO"
          ? editData.lugar || ""
          : "",
      fecha:
        editData.tipo === "PERDIDO" || editData.tipo === "ENCONTRADO"
          ? editData.fecha || ""
          : "",
      sexo: editData.sexo || "",
      [PUBLICACION_SIZE_FIELD]: getPublicacionTamano(editData),
      color: editData.color || "",
      detalles: editData.detalles || "",
      afinidad: editData.tipo === "ADOPCION" ? editData.afinidad || "" : "",
      afinidadanimales:
        editData.tipo === "ADOPCION" ? editData.afinidadanimales || "" : "",
      energia: editData.tipo === "ADOPCION" ? editData.energia || "" : "",
      castrado: editData.tipo === "ADOPCION" ? !!editData.castrado : false,
      whatsapp: editData.whatsapp || "",
      imgs:
        editData.imgs?.length > 0 ? editData.imgs : editData.img ? [editData.img] : [],
      lat: null,
      lng: null,
    });
  }, [editData]);

  const clearFieldError = (name) => {
    if (!errors[name]) return;

    setErrors((prev) => {
      const nextErrors = { ...prev };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "especie") {
      setForm((prev) => ({ ...prev, especie: value, raza: "" }));
      clearFieldError("especie");
      clearFieldError("raza");
      return;
    }

    if (name === "tipo") {
      setForm((prev) => ({
        ...prev,
        tipo: value,
        nombreanimal: "",
        edad: "",
        localidad: "",
        lugar: "",
        fecha: "",
        afinidad: "",
        afinidadanimales: "",
        energia: "",
        castrado: false,
        lat: null,
        lng: null,
      }));

      [
        "localidad",
        "lugar",
        "fecha",
        "afinidad",
        "afinidadanimales",
        "energia",
        "castrado",
      ].forEach(clearFieldError);
      return;
    }

    if (name === "lugar") {
      // Si el usuario edita la dirección a mano después de usar el GPS, esa edición
      // expresa la intención de corregir/reemplazar el punto capturado — se descarta
      // para que no quede un pin GPS desactualizado "ganándole" a la dirección nueva.
      setForm((prev) => ({
        ...prev,
        lugar: value,
        ...(prev.lat != null ? { lat: null, lng: null } : {}),
      }));
      clearFieldError(name);
      return;
    }

    if (name === "whatsapp") {
      const numericValue = value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, whatsapp: numericValue }));
      clearFieldError(name);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    clearFieldError(name);
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  const setFormImgs = (urls) => setForm((prev) => ({ ...prev, imgs: urls }));

  const capturarUbicacionGPS = () => {
    if (!navigator.geolocation) {
      setErrorUbicacion("Tu navegador no admite geolocalización");
      return;
    }

    setCapturandoUbicacion(true);
    setErrorUbicacion("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }));
        setCapturandoUbicacion(false);
      },
      () => {
        setErrorUbicacion("No pudimos obtener tu ubicación. Podés cargar la dirección a mano.");
        setCapturandoUbicacion(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  return {
    form,
    errors,
    setErrors,
    handleChange,
    resetForm,
    setFormImgs,
    razasPorEspecie,
    capturarUbicacionGPS,
    capturandoUbicacion,
    errorUbicacion,
  };
};
