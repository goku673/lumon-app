import Image from "next/image";

const Home = () => {
  return (
    <div className="">
      <div className="text-center text-white lg:text-left lg:ml-36 text-xl font-bold">
        COMUNICADOS(S):
      </div>
      <div className="flex flex-col lg:flex-row justify-around lg:justify-center items-center w-full p-4">
        <div className="h-150 w-full lg:w-1/3 m-2 lg:mx-1 relative">
          <Image
            src="/assets/comunicado1.jpg"
            alt="Comunicado"
            fill
            style={{ objectFit: "contain" }}
            className="object-cover"
            priority
          />
        </div>
        <div className="h-150 w-full lg:w-1/2 m-2 lg:mx-1 relative">
          <Image
            src="/assets/portada1.jpg"
            alt="Portada"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100  mt-8 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Olimpiadas Lumon</h3>
              <p className="mb-4">
                Promoviendo la excelencia académica y el desarrollo de
                habilidades en estudiantes.
              </p>
              <p>
                © {new Date().getFullYear()} Lumon. Todos los derechos
                reservados.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-blue-300">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="/inscription" className="hover:text-blue-300">
                    Inscripción
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Resultados
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-300">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Contacto</h3>
              <p className="mb-2">Dirección: Av. Principal #123</p>
              <p className="mb-2">Teléfono: (123) 456-7890</p>
              <p className="mb-2">Email: info@olimpiadaslumon.com</p>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-blue-300">
                  Facebook
                </a>
                <a href="#" className="hover:text-blue-300">
                  Twitter
                </a>
                <a href="#" className="hover:text-blue-300">
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
