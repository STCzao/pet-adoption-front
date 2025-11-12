import React from "react";
import {
  SidebarProvider,
  SidebarOpciones,
} from "../../components/SidebarOpciones/SidebarOpciones";

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const CasosExitoScreen = ({ cerrarSesion }) => {
  return (
    <div>
      <SidebarProvider>
        <Navbar cerrarSesion={cerrarSesion} />
        <SidebarOpciones />
      </SidebarProvider>
      <div
        className="w-full min-h-screen text-white flex flex-col items-center justify-center px-4 md:px-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${Img_Casos})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <Footer />
    </div>
  );
};

export default CasosExitoScreen;
