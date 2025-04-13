import { useEffect, useState } from 'react';

interface Especialidad {
  id: number;
  nombre: string;
}

const Footer = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);

  useEffect(() => {
    fetch("https://apiclinicasalud.azurewebsites.net/api/especialidad")
      .then((res) => res.json()).then((data) => {
        if (Array.isArray(data.content)) {
          setEspecialidades(data.content);
        } else {
          console.warn("Especialidades inválidas:", data.content);
          setEspecialidades([]);
        }
      })
      .catch((error) => {
        console.error("Error al cargar especialidades:", error);
      });
  }, []);

  return (
    <footer className="bg-[#117EE8] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Columna 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Salud Integral S.A.</h3>
            <p className="text-sm">
              Comprometidos con su salud y bienestar desde 2010, ofreciendo servicios médicos de calidad con un enfoque humano y personalizado.
            </p>
          </div>

          {/* Columna 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-blue-400 transition">Inicio</a>
              </li>
              {/* Si necesitás volver a habilitar más enlaces, los podés agregar fácilmente acá */}
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm">
              {especialidades.slice(0, 5).map((esp) => (
                <li key={esp.id}>
                  <a href="#servicios" className="hover:text-blue-200 transition">{esp.nombre}</a>
                </li>
              ))}
              
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horario de atención</h3>
            <p className="text-sm"><strong>Lunes a Viernes:</strong> 8:00 AM - 8:00 PM</p>
            <p className="text-sm"><strong>Sábados:</strong> 8:00 AM - 2:00 PM</p>
            <p className="text-sm"><strong>Domingos:</strong> Cerrado</p>
            <p className="text-sm"><strong>Emergencias:</strong> 24/7</p>
          </div>
        </div>

        <div className="border-t border-white pt-6 text-center text-sm">
          <p>&copy; 2025 Salud Integral S.A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

