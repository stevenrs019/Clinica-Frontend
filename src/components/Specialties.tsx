import { useEffect, useState } from 'react'
import axios from 'axios'

interface Especialidad {
  id: number
  nombre: string
  subtitle: string;
  descripcion: string
  icono: string
}

const Specialties = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([])

  useEffect(() => {
    axios
      .get('https://apiclinicasalud.azurewebsites.net/api/especialidad')
      .then((res) => setEspecialidades(res.data.content)) 
      .catch((err) => console.error('Error cargando especialidades', err));
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10">Especialidades</h2>
      <h4 className="text-lg  text-center mb-10">Cada una de nuestras especialidades está liderada por profesionales altamente capacitados y <br/> comprometidos con tu bienestar. Descubre más sobre nuestros servicios:</h4>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-4">
        {especialidades.map((esp) => (
          <div
            key={esp.id}
            className="bg-white p-6 rounded-lg shadow text-left hover:shadow-md transition"
          >
            <img
              src={`/img/especialidades/${esp.icono}`}
              alt={esp.nombre}
              className="h-20 w-20 mb-4 object-contain"
            />
            <h3 className="text-xl font-semibold mb-2">{esp.nombre}</h3>
            <p className="text-md pb-3 text-gray-600">{esp.subtitle}</p>
            <p className="text-sm text-gray-600">{esp.descripcion}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
              Agendar cita
            </button>
          </div>
        ))}
      </div>
    </section>
  )
};

export default Specialties;
