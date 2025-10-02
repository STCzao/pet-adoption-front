"use client";
import {
  SidebarProvider,
  SidebarOpciones,
} from "../../components/SidebarOpciones/SidebarOpciones";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const HomeScreen = ({ cerrarSesion, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div>
      <SidebarProvider>
        <Navbar cerrarSesion={cerrarSesion} />
        <SidebarOpciones/>
      </SidebarProvider>
      <div className="w-full min-h-screen bg-[linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(../src/assets/Img_home.png)] bg-cover bg-center text-white flex items-center justify-center px-4 md:px-10">
        <div className="flex flex-col items-center text-white/90 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-medium mt-4 sm:mt-6 flex flex-col justify-center p-4 sm:p-5 w-full sm:w-11/12 md:w-full text-base sm:text-lg md:text-xl rounded-lg bg-white/20 mb-8 text-center"
          >
            Miles de perritos caminan sin rumbo o abandonados. En Perdidos y
            Adopciones buscamos devolverles lo que más necesitan: un hogar lleno
            de amor.
          </motion.p>

          <div className="mt-10 mb-10 flex flex-col sm:flex-row items-center gap-8">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-medium w-45 h-11 rounded-full text-white bg-white/20 hover:bg-[#FF7857] transition-opacity"
            >
              Casos de éxito
            </motion.button>

            {/* Dropdown Perros perdidos */}
            <div className="relative">
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-medium w-45 h-11 rounded-full text-white bg-white/20 hover:bg-[#FF7857] transition-opacity flex items-center justify-between px-4"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                Perros perdidos
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </motion.button>

              {dropdownOpen && (
                <div className="absolute top-full mt-2 w-45 bg-white/20 rounded-lg shadow-lg flex flex-col overflow-hidden z-10">
                  <a
                    href="/perdi-animal"
                    className="px-4 py-2 text-white hover:bg-[#FF7857] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Perdí un animal
                  </a>
                  <a
                    href="/encontre-animal"
                    className="px-4 py-2 text-white hover:bg-[#FF7857] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Encontré un animal
                  </a>
                </div>
              )}
            </div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className=" font-medium w-45 h-11 rounded-full text-white bg-white/20 hover:bg-[#FF7857] transition-opacity"
            >
              Adopción
            </motion.button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
