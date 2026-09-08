import { Suspense, lazy, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { resolvePostLoginRedirect } from "../utils/postLoginRedirect";
import LoadingState from "../components/ui/LoadingState";
import PageTransition from "../components/ui/PageTransition";

const Home = lazy(() => import("../features/home/pages/Home"));
const PublicacionDetalle = lazy(() =>
  import("../features/publicaciones/pages/PublicacionDetalle"),
);
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Publicaciones = lazy(() => import("../features/publicaciones/pages/Publicaciones"));
const PublicacionesExitosas = lazy(() =>
  import("../features/publicaciones/pages/PublicacionesExitosas"),
);
const MapaPublicaciones = lazy(() => import("../features/publicaciones/pages/MapaPublicaciones"));
const Comunidad = lazy(() => import("../pages/Comunidad"));
const Contact = lazy(() => import("../pages/Contact"));
const TerminosCondiciones = lazy(() => import("../pages/TerminosCondiciones"));
const Perdi = lazy(() => import("../pages/consejos/Perdi"));
const Encontre = lazy(() => import("../pages/consejos/Encontre"));
const Adoptar = lazy(() => import("../pages/consejos/Adoptar"));

const RouteFallback = () => <LoadingState fullScreen label="Cargando contenido..." />;

// Único punto que decide a dónde ir después de un login/registro exitoso. Antes
// convivían dos mecanismos (un navigate() explícito en Login/Register y este mismo
// guard con <Navigate to="/">) que competían entre sí: cuando `login` pasaba a
// true durante la transición animada de página, el guard reactivo ganaba la
// carrera y mandaba a home aunque el navigate() explícito ya hubiera acertado el
// destino. Con un solo mecanismo (este) no hay dos navegaciones disputándose el resultado.
//
// El guard de `hasRedirected` evita un segundo problema: resolvePostLoginRedirect()
// borra la clave de localStorage al leerla (no es idempotente), y React.StrictMode
// invoca los efectos dos veces en desarrollo — sin el guard, la segunda invocación
// no encontraba nada guardado y terminaba redirigiendo a "/" por defecto.
const PostLoginRedirect = () => {
  const navigate = useNavigate();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;
    hasRedirected.current = true;
    navigate(resolvePostLoginRedirect(), { replace: true });
  }, [navigate]);

  return null;
};

const wrap = (Component, props = {}) => (
  <PageTransition>
    <Suspense fallback={<RouteFallback />}>
      <Component {...props} />
    </Suspense>
  </PageTransition>
);

const AppRouter = () => {
  const { login, user, guardarUsuario } = useAuth();
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={wrap(Home, { user })} />
        <Route path="/publicaciones/:tipo" element={wrap(Publicaciones, { user })} />
        <Route
          path="/publicaciones/:tipo/:id"
          element={wrap(PublicacionDetalle, { user })}
        />
        <Route
          path="/casos-resueltos"
          element={wrap(PublicacionesExitosas, { user })}
        />
        <Route path="/mapa" element={wrap(MapaPublicaciones)} />
        <Route path="/consejos-perdi" element={wrap(Perdi, { user })} />
        <Route path="/consejos-encontre" element={wrap(Encontre, { user })} />
        <Route path="/consejos-adopcion" element={wrap(Adoptar, { user })} />
        <Route path="/casos-ayuda" element={wrap(Comunidad, { user })} />
        <Route path="/contacto" element={wrap(Contact, { user })} />
        <Route
          path="/terminos-y-condiciones"
          element={wrap(TerminosCondiciones)}
        />
        <Route path="/quienes-somos" element={<Navigate to="/contacto" replace />} />

        <Route
          path="/login"
          element={
            login ? <PostLoginRedirect /> : <Login guardarUsuario={guardarUsuario} />
          }
        />
        <Route
          path="/register"
          element={
            login ? <PostLoginRedirect /> : <Register guardarUsuario={guardarUsuario} />
          }
        />
        <Route
          path="/forgot-password"
          element={login ? <Navigate to="/" /> : <ForgotPassword />}
        />
        <Route
          path="/reset-password/:token"
          element={login ? <Navigate to="/" /> : <ResetPassword />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRouter;
