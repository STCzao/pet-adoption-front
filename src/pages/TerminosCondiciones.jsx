import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import Seo from "../components/seo/Seo";

const sections = [
  {
    title: "Introducción",
    content:
      "Perdidos y Adopciones es una plataforma comunitaria pensada para difundir casos de animales perdidos, encontrados y en adopción. Al navegar o publicar contenido en el sitio, aceptas estas condiciones de uso.",
  },
  {
    title: "Uso del sitio",
    content:
      "Quienes usan la plataforma se comprometen a compartir información veraz, actualizada y respetuosa. No está permitido publicar contenido engañoso, ofensivo, discriminatorio o que vulnere derechos de terceros.",
  },
  {
    title: "Contenido publicado y propiedad intelectual",
    content:
      "Al publicar fotos, descripciones u otro contenido en el sitio, declarás que sos el titular de esos derechos o que contás con autorización para usarlos, y le otorgás a Perdidos y Adopciones una licencia no exclusiva para mostrarlos dentro de la plataforma con el único fin de difundir cada caso. Sos responsable del contenido que publicás y de que no vulnere derechos de terceros.",
  },
  {
    title: "Moderación y eliminación de contenido",
    content:
      "Perdidos y Adopciones se reserva el derecho de revisar, editar, rechazar o eliminar publicaciones que incumplan estos términos, contengan información falsa o resulten inapropiadas, sin necesidad de aviso previo. Esta tarea la realiza un equipo de administración y moderación, con acceso a los datos necesarios para verificar y gestionar cada caso.",
  },
  {
    title: "Tratamiento de datos personales",
    content:
      "Esta plataforma solicita datos personales — nombre, número de contacto telefónico, correo electrónico y, según el caso, fotos y ubicación geográfica — que se incorporan a tu perfil y a tus publicaciones con el único fin de poder contactarte, informarte sobre animales perdidos, encontrados o en adopción, y llevar adelante todas las acciones vinculadas al objeto de este sitio. Si te registrás con Google, recibimos tu nombre, correo y foto de perfil desde tu cuenta. Si completás el formulario de colaboración, también recopilamos tu localidad, barrio y disponibilidad horaria, únicamente para coordinar con vos según la forma de ayuda que elijas. Al enviar una publicación o formulario, declarás y aceptás que:",
    list: [
      "Los datos personales ingresados son propios, reales y veraces, y los brindás de manera voluntaria y consciente, sin existir impedimentos legales o de capacidad para hacerlo.",
      "Autorizás expresamente el tratamiento de dichos datos con la única finalidad de colaborar en la búsqueda, denuncia, difusión o adopción responsable de animales domésticos, conforme al objeto de esta página.",
      "Tenés conocimiento de que los datos serán tratados de forma confidencial, no serán divulgados ni utilizados para fines distintos a los aquí indicados, y que su acceso se encuentra limitado al administrador del sitio, sin perjuicio de los riesgos propios de cualquier entorno digital.",
      "Declarás conocer que podés solicitar en cualquier momento la actualización o eliminación de tus datos personales, de acuerdo con la normativa vigente en materia de protección de datos personales (Ley Nº 25.326).",
    ],
  },
  {
    title: "Geolocalización",
    content:
      "En publicaciones de animales perdidos o encontrados, la ubicación se puede cargar por GPS o por dirección escrita. La ubicación exacta que ingresás se guarda de forma confidencial y solo es accesible para el equipo de moderación del sitio; en el mapa público y en cada publicación se muestra una ubicación aproximada, desplazada aleatoriamente, para proteger tu privacidad.",
  },
  {
    title: "Servicios de terceros",
    content:
      "Para operar el sitio utilizamos servicios de terceros que pueden procesar parte de tus datos: Google, para el inicio de sesión con tu cuenta; Cloudinary, para el almacenamiento de las imágenes que subís; y OpenStreetMap/Nominatim, para ubicar direcciones en el mapa cuando no compartís tu ubicación por GPS. Cada uno de estos servicios procesa los datos según sus propias políticas de privacidad.",
  },
  {
    title: "Responsabilidad",
    content:
      "Perdidos y Adopciones actúa como espacio de difusión y conexión entre personas. No garantiza resultados concretos en cada publicación ni asume responsabilidad por acuerdos, contactos o interacciones fuera del sitio.",
  },
  {
    title: "Contacto",
    content:
      "Si tienes dudas sobre estas condiciones o necesitas reportar un problema, puedes escribirnos a través de la sección de contacto para que podamos ayudarte.",
  },
];

export default function TerminosCondiciones() {
  return (
    <div className="bg-[color:var(--nature-sand)] text-[color:var(--nature-ink)]">
      <Seo
        title="Términos y Condiciones"
        description="Consulta los términos y condiciones de uso de Perdidos y Adopciones, con pautas de publicación, privacidad de datos, responsabilidades y contacto."
        path="/terminos-y-condiciones"
      />
      <Navbar />

      <main className="px-4 pb-[calc(var(--mobile-bottom-nav-offset)+env(safe-area-inset-bottom))] pt-26 sm:px-6 sm:pt-30 lg:px-8 lg:pb-16 lg:pt-32">
        <div className="mx-auto max-w-4xl rounded-[1.6rem] border border-[color:var(--shell-line)] bg-[color:var(--shell-surface)] p-6 shadow-[0_18px_40px_rgba(36,25,20,0.08)] sm:p-8">
          <h1 className="font-editorial text-[2.2rem] leading-[0.95] text-[color:var(--shell-bark)] sm:text-[3rem]">
            Términos y Condiciones de uso
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[color:var(--shell-muted)] sm:text-base">
            Estas condiciones explican cómo funciona el sitio, qué esperamos del uso
            comunitario y de qué manera cuidamos la información compartida en cada caso.
          </p>

          <div className="mt-8 space-y-6">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[1.2rem] bg-[color:var(--shell-surface-soft)] p-5"
              >
                <h2 className="text-xl font-semibold text-[color:var(--shell-bark)]">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--shell-muted)] sm:text-base">
                  {section.content}
                </p>
                {section.list && (
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-[color:var(--shell-muted)] sm:text-base">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <Link
            to="/"
            className="mt-8 inline-flex rounded-full border border-[color:var(--shell-line)] bg-[color:var(--shell-surface-soft)] px-5 py-2.5 text-sm font-semibold text-[color:var(--shell-bark)] transition-colors duration-200 hover:bg-[color:var(--shell-surface-alt)]"
          >
            Volver al inicio
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
