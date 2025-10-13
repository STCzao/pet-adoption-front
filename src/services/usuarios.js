const API_URL = import.meta.env.VITE_API_URL;

export const usuariosService = {
  getMiPerfil: async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          ok: false,
          msg: "No hay token de autenticación",
        };
      }

      const resp = await fetch(`${API_URL}/usuarios/mi-perfil`, {
        method: "GET",
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
      });

      if (resp.status === 401) {
        localStorage.removeItem("token");
        return {
          ok: false,
          msg: "Sesión expirada",
        };
      }

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({}));
        return {
          ok: false,
          msg: errorData.msg || "Error al obtener perfil",
          errors: errorData.errors,
        };
      }

      const data = await resp.json();

      return {
        ok: true,
        usuario: data.usuario || data,
      };
    } catch (error) {
      console.error("Error en getMiPerfil:", error);
      return {
        ok: false,
        msg: "Error de conexión al servidor",
      };
    }
  },

  actualizarPerfil: async (datos) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          ok: false,
          msg: "No hay token de autenticación",
        };
      }

      // Filtrar solo los campos permitidos
      const datosPermitidos = {};
      if (datos.nombre !== undefined)
        datosPermitidos.nombre = datos.nombre.trim();
      if (datos.telefono !== undefined)
        datosPermitidos.telefono = datos.telefono.trim();

      // Si no hay campos válidos, retornar error
      if (Object.keys(datosPermitidos).length === 0) {
        return {
          ok: false,
          msg: "No hay campos válidos para actualizar",
        };
      }

      const resp = await fetch(`${API_URL}/usuarios/mi-perfil`, {
        method: "PUT",
        body: JSON.stringify(datosPermitidos),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "x-token": token,
        },
      });

      if (resp.status === 401) {
        localStorage.removeItem("token");
        return {
          ok: false,
          msg: "Sesión expirada",
        };
      }

      const responseData = await resp.json();

      if (!resp.ok) {
        // Manejar errores del backend
        let errorMsg = responseData.msg || "Error al actualizar perfil";

        // Si hay errores específicos, extraerlos
        if (responseData.errors) {
          if (Array.isArray(responseData.errors)) {
            errorMsg = responseData.errors.join(", ");
          } else if (typeof responseData.errors === "object") {
            errorMsg = Object.values(responseData.errors).join(", ");
          }
        }

        return {
          ok: false,
          msg: errorMsg,
          errors: responseData.errors,
        };
      }

      return {
        ok: true,
        ...responseData,
        _id: responseData._id || responseData.uid,
        usuario: responseData.usuario || responseData,
      };
    } catch (error) {
      console.error("Error en actualizarPerfil:", error);
      return {
        ok: false,
        msg: "Error de conexión al servidor",
      };
    }
  },

  borrarUsuario: async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          ok: false,
          msg: "No hay token de autenticación",
        };
      }

      const resp = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          "x-token": token,
          "Content-Type": "application/json",
        },
      });

      if (resp.status === 401) {
        localStorage.removeItem("token");
        return {
          ok: false,
          msg: "Sesión expirada",
        };
      }

      const data = await resp.json();

      if (!resp.ok) {
        return {
          ok: false,
          msg: data.msg || "Error al eliminar usuario",
        };
      }

      return {
        ok: true,
        ...data,
      };
    } catch (error) {
      console.error("Error en borrarUsuario:", error);
      return {
        ok: false,
        msg: "Error de conexión al servidor",
      };
    }
  },
};
