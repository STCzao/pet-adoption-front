import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ForgotPasswordScreen = () => {
  const [correo, setCorreo] = useState("");
  const [result, setResult] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!correo.trim()) {
      setErrors({ correo: "El correo es obligatorio" });
      return;
    }
    setErrors({});

    try {
      setResult("Enviando correo...");
      const resp = await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: correo.trim() }),
      });
      const data = await resp.json();

      if (!resp.ok) {
        setResult(data.msg || "Error al enviar correo");
      } else {
        setResult("Revisa tu correo para restablecer la contraseña");
      }
    } catch (error) {
      console.error(error);
      setResult("Error en la conexión al servidor");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/img_login1.png)] bg-cover bg-center text-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center text-white/90 w-full"
      >
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-96 w-full text-center border border-white/70 rounded-2xl px-8 py-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
        >
          <h1 className="text-white text-3xl mt-2 font-medium">
            Recuperar contraseña
          </h1>

          <div className="flex items-center w-full mt-8 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="email"
              placeholder="Correo"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          {errors.correo && (
            <p className="text-red-400 text-xs mt-1">{errors.correo}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full h-11 rounded-full text-white bg-black border border-white/70 hover:bg-[#FF7857] transition-opacity"
          >
            Enviar correo
          </button>

          {result && <p className="text-center mt-3 text-white">{result}</p>}

          <p className="text-white text-sm mt-3 mb-6">
            <a className="text-white underline" href="/login">
              Volver
            </a>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordScreen;
