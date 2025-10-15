const API_URL = import.meta.env.VITE_API_URL;

const cache = { publicaciones: null, usuarios: null, timestamp: null };
const CACHE_DURATION = 30000;

export const adminService = {
  getTodasPublicaciones: async () => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`${API_URL}/publicaciones/admin/todas`, {
        headers: { "x-token": token || "" },
      });

      if (!resp.ok) {
        let errorMsg = "Error al obtener publicaciones";
        const errorData = await resp.json().catch(() => ({}));
        return {
          success: false,
          msg: errorData.msg || "Error al obtener publicaciones",
        };
      }

      const data = await resp.json();
      return { success: true, publicaciones: data.publicaciones || [] };
    } catch (error) {
      return { success: false, msg: "Error de conexión al servidor" };
    }
  },

  getTodosUsuarios: async () => {
    try {
      if (
        cache.usuarios &&
        cache.timestamp &&
        Date.now() - cache.timestamp < CACHE_DURATION
      ) {
        return cache.usuarios;
      }

      const token = localStorage.getItem("token");
      if (!token) {
      }

      const resp = await fetch(`${API_URL}/usuarios`, {
        headers: { "x-token": token || "" },
      });

      if (!resp.ok) {
        let errorMsg = "Error al obtener usuarios";
        try {
          const errorData = await resp.json();
          errorMsg = errorData.msg || errorMsg;
        } catch (jsonErr) {}
        return { msg: errorMsg };
      }

      const data = await resp.json();

      const usuarios =
        data.usuarios || data.data || (Array.isArray(data) ? data : []) || [];
      const result = { usuarios };

      cache.usuarios = result;
      cache.timestamp = Date.now();

      return result;
    } catch (error) {
      return { msg: "Error de conexión al servidor" };
    }
  },

  cambiarEstadoUsuario: async (id, estado) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await fetch(`${API_URL}/usuarios/${id}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-token": token || "",
        },
        body: JSON.stringify({ estado }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        return { ok: false, msg: data.msg || "Error al actualizar el estado" };
      }

      return { ok: true, usuario: data.usuario };
    } catch (error) {
      return { ok: false, msg: "Error de conexión al servidor" };
    }
  },

  clearCache: () => {
    cache.publicaciones = null;
    cache.usuarios = null;
    cache.timestamp = null;
  },
};
