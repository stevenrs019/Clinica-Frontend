import React, { useEffect, useState } from 'react';

interface Especialidad {
  id: number;
  nombre: string;
}

interface Medico {
  id: number;
  nombre: string;
}

interface Horario {
  id_HORARIO: number;
  hora_INICIO: string;
  hora_FIN: string;
  estado: string;
}

const ScheduleAppointment = () => {
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [horarios, setHorarios] = useState<Horario[]>([]);

  const [idEspecialidad, setIdEspecialidad] = useState(0);
  const [idMedico, setIdMedico] = useState(0);
  const [fecha, setFecha] = useState('');
  const [idHorario, setIdHorario] = useState(0);

  const [cargandoHorarios, setCargandoHorarios] = useState(false);

  useEffect(() => {
    fetch("https://apiclinicasalud.azurewebsites.net/api/especialidad")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.content)) {
          setEspecialidades(data.content);
        } else {
          console.warn("Especialidades inválidas:", data.content);
          setEspecialidades([]);
        }
      })
      .catch(() => alert("Error al cargar especialidades"));
  }, []);

  useEffect(() => {
    // Simulamos lista de médicos
    if (idEspecialidad > 0) {
      setMedicos([
        { id: 1, nombre: "Dr. Juan Pérez" },
        { id: 2, nombre: "Dra. Ana Gómez" },
      ]);
    } else {
      setMedicos([]);
    }
  }, [idEspecialidad]);

  const obtenerHorarios = async () => {
    if (!idMedico || !fecha) return;
    setCargandoHorarios(true);

    const [anio, mes, dia] = fecha.split('-').map(Number);

    const body = {
      id_MEDICO: idMedico,
      dia,
      mes,
      anio,
    };

    try {
      const response = await fetch("https://apiclinicasalud.azurewebsites.net/api/cita/disponibilidad", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();

      if (result.code === 0 && Array.isArray(result.content)) {
        const horariosMapeados = result.content.map((h: any) => ({
          id_HORARIO: h.iD_HORARIO,
          hora_INICIO: h.horA_INICIO,
          hora_FIN: h.horA_FIN,
          estado: h.estado,
        }));
        setHorarios(horariosMapeados);
      } else {
        setHorarios([]);
        alert(result.message);
      }
    } catch (error) {
      alert("Error al consultar disponibilidad");
    } finally {
      setCargandoHorarios(false);
    }
  };

  const agendarCita = async () => {
    if (!idMedico || !fecha || !idHorario) {
      alert("Seleccioná todos los campos");
      return;
    }

    const [anio, mes, dia] = fecha.split('-').map(Number);

    const cita = {
      id_MEDICO: idMedico,
      id_PACIENTE: 1, // ⚠️ Esto debe venir del usuario logueado
      id_HORARIO: idHorario,
      dia,
      mes,
      anio
    };

    try {
      const res = await fetch("https://apiclinicasalud.azurewebsites.net/api/cita/agendar", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cita)
      });

      const result = await res.json();
      alert(result.message);
    } catch (err) {
      alert("Error al agendar la cita");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Agendar Cita</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Especialidad</label>
          <select className="w-full border px-4 py-2 rounded" value={idEspecialidad} onChange={(e) => setIdEspecialidad(Number(e.target.value))}>
            <option value="0">Seleccioná una especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.id} value={esp.id}>{esp.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Médico</label>
          <select className="w-full border px-4 py-2 rounded" value={idMedico} onChange={(e) => setIdMedico(Number(e.target.value))}>
            <option value="0">Seleccioná un médico</option>
            {medicos.map((m) => (
              <option key={m.id} value={m.id}>{m.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Fecha</label>
          <input type="date" className="w-full border px-4 py-2 rounded" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          <button
            onClick={obtenerHorarios}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Consultar Horarios
          </button>
        </div>

        {cargandoHorarios && <p className="text-gray-500">Cargando horarios disponibles...</p>}

        {horarios.length > 0 && (
          <div>
            <label className="block mb-1 font-medium">Horarios Disponibles</label>
            <select className="w-full border px-4 py-2 rounded" value={idHorario} onChange={(e) => setIdHorario(Number(e.target.value))}>
              <option value="0">Seleccioná un horario</option>
              {horarios.map((h) => (
                <option key={h.id_HORARIO} value={h.id_HORARIO}>
                  {h.hora_INICIO} - {h.hora_FIN}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={agendarCita}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Agendar Cita
        </button>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
