import React from "react";
import { Badge } from "@/common/badge";
import Link from "next/link";
//Definir componentes
//Definir componentes
//Definir componentes

const Footer = () => {
  //Definir variables

  const quickLinks = [
    //Definir enlaces rápidos
    { name: "Inicio", path: "/" },
    { name: "Inscripción", path: "/inscription" },
    { name: "Resultados", path: "/resultados" },
    { name: "Contacto", path: "/contacto" },
  ];

  //Definir enlaces sociales
  const socialLinks = [
    //Definir enlaces sociales
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Instagram", url: "https://instagram.com" },
  ];

  //Definir retorno
  return (
    //Definir retorno
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#0f2e5a]">
              Olimpiadas SanSi
            </h3>
            <p className="mb-4">
              Promoviendo la excelencia académica y el desarrollo de habilidades
              en estudiantes.
            </p>
            <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#0f2e5a]">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                //Mapear lista de enlaces rápidos como Links
                <li key={index}>
                  <Link href={link.path} className="hover:text-[#0f2e5a]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-[#0f2e5a]">Contacto</h3>
            <p className="mb-2">Dirección: Av. Principal #123</p>
            <p className="mb-2">Teléfono: (123) 456-7890</p>
            <p className="mb-2">Email: info@olimpiadassansi.com</p>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                //Mapear lista de enlaces sociales como Links
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0f2e5a]"
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
