import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Seo from "../components/seo/Seo";
import ColaboradoresForm from "../features/colaboradores/ColaboradoresForm";
import { buildBreadcrumbSchema } from "../components/seo/seoUtils";

const QUIENES_SOMOS_SECTIONS = [
  {
    title: "Misión del proyecto",
    content:
      "Buscamos dar visibilidad a animales perdidos, encontrados y en adopción para que cada publicación tenga más alcance, más claridad y mejores posibilidades de lograr un reencuentro o un nuevo hogar.",
  },
  {
    title: "Quiénes lo hacen",
    content:
      "Perdidos y Adopciones se sostiene gracias a personas comprometidas con el bienestar animal, la difusión responsable y la ayuda comunitaria frente a situaciones urgentes o procesos de adopción.",
  },
  {
    title: "Cómo nació",
    content:
      "El proyecto surgió a partir de la necesidad de reunir en un solo espacio casos dispersos en redes sociales, para ordenar la información, facilitar el contacto y dar más herramientas a quienes buscan ayuda.",
  },
];

const ContactScreen = () => {
  return (
    <div className="bg-[#f6efe4] text-[#241914]">
      <Seo
        title="Quiénes somos y cómo colaborar"
        description="Conocé quiénes están detrás de Perdidos y Adopciones Tucumán y sumate a la comunidad solidaria colaborando o donando."
        path="/contacto"
        structuredData={[
          buildBreadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: "Quiénes somos y cómo colaborar", path: "/contacto" },
          ]),
        ]}
      />
      <Navbar />

      <div className="min-h-screen px-4 pb-[calc(var(--mobile-bottom-nav-offset)+env(safe-area-inset-bottom))] pt-28 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 border-b border-[#2f241d]/10 pb-8 text-center"
          >
            <span className="inline-flex rounded-full border border-[#d46f49]/20 bg-[#fbf0e8] px-4 py-1.5 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-[#d46f49]">
              Comunidad solidaria
            </span>
            <h1 className="font-editorial mt-4 text-[2.4rem] leading-[1.05] text-[#241914] sm:text-[3rem]">
              Sumate a una red que ayuda
            </h1>
            <div className="mx-auto mt-4 max-w-lg space-y-3 text-[0.95rem] leading-relaxed text-[#5f4c41]">
              <p>
                Cuando un animal se pierde o necesita ayuda, cada persona puede hacer
                una diferencia.
              </p>
              <p>
                Esta red busca conectar y organizar esas acciones, según la zona, el
                tiempo y las posibilidades de cada uno.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-10"
          >
            <h2 className="text-center text-xl font-semibold text-[#241914]">
              Quiénes somos
            </h2>
            <div className="mt-5 space-y-4">
              {QUIENES_SOMOS_SECTIONS.map((section) => (
                <section
                  key={section.title}
                  className="rounded-[1.2rem] border border-[#2f241d]/10 bg-white/70 p-5"
                >
                  <h3 className="font-semibold text-[#241914]">{section.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f4c41]">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ColaboradoresForm />
          </motion.div>

          {/* Donaciones: pendiente el alias real antes de publicar esta sección.
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-10 rounded-[1.2rem] border border-[#2f241d]/10 bg-white/70 p-5 text-center"
          >
            <h2 className="text-xl font-semibold text-[#241914]">Donaciones</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5f4c41]">
              También podés colaborar económicamente con una transferencia.
            </p>
            <p className="mt-3 text-sm font-semibold text-[#241914]">
              Alias: [ALIAS A COMPLETAR]
            </p>
          </motion.div>
          */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactScreen;
