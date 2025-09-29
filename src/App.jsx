import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "../src/pages/LoginScreen/LoginScreen";
import RegisterScreen from "../src/pages/RegisterScreen/RegisterScreen";
import ForgotPasswordScreen from "../src/pages/ForgotPasswordScreen/ForgotPasswordScreen";
import ResetPasswordScreen from "../src/pages/ResetPasswordScreen/ResetPasswordScreen";
import ProtectedRoutes from "../src/routes/ProtectedRoutes/ProtectedRoutes";
import HomeScreen from "../src/pages/HomeScreen/HomeScreen";

function App() {
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(null);

  const guardarUsuario = (datos) => setUser(datos);
  const iniciarSesion = () => setLogin(true);
  const cerrarSesion = () => {
    setLogin(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={
            <LoginScreen
              iniciarSesion={iniciarSesion}
              guardarUsuario={guardarUsuario}
            />
          }
        />

        {/* Register */}
        <Route path="/register" element={<RegisterScreen />} />

        {/* Recuperar contraseña */}
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        <Route
          path="/reset-password/:token"
          element={<ResetPasswordScreen />}
        />

        {/* Rutas protegidas */}
        <Route
          path="/*"
          element={
            <ProtectedRoutes login={login}>
              <HomeScreen cerrarSesion={cerrarSesion} user={user} />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
