import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderPacient from './HeaderPacient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

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
  const [fecha, setFecha] = useState<Date | null>(null);
  const [idHorario, setIdHorario] = useState(0);

  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const navigate = useNavigate();
  const [enviando, setEnviando] = useState(false);

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
    if (idEspecialidad > 0) {
      fetch(`https://apiclinicasalud.azurewebsites.net/api/medico/obtener-por-especialidad/${idEspecialidad}`)
        .then(res => res.json())
        .then(data => {
          if (data.code === 0 && Array.isArray(data.content)) {
            const medicosMapeados = data.content.map((m: any) => ({
              id: m.idMedico,
              nombre: `${m.nombre} ${m.apellido1} ${m.apellido2}`
            }));
            setMedicos(medicosMapeados);
          } else {
            setMedicos([]);
            Swal.fire({
              icon: 'info',
              title: 'Sin médicos',
              text: data.message || 'No hay médicos disponibles para esta especialidad.'
            });
          }
        })
        .catch(() => {
          setMedicos([]);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al obtener los médicos.'
          });
        });
    } else {
      setMedicos([]);
    }
  }, [idEspecialidad]);
  

  const obtenerHorarios = async () => {
    if (idEspecialidad === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Seleccioná una especialidad',
        text: 'Debés elegir una especialidad antes de continuar.'
      });
      return;
    }

    if (idMedico === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Seleccioná un médico',
        text: 'Debés seleccionar un médico para ver disponibilidad.'
      });
      return;
    }

    if (!fecha) {
      Swal.fire({
        icon: 'warning',
        title: 'Seleccioná una fecha',
        text: 'Elegí una fecha para consultar los horarios disponibles.'
      });
      return;
    }

    setCargandoHorarios(true);

    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

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
        Swal.fire({
          icon: 'info',
          title: 'Sin disponibilidad',
          text: result.message || 'No se encontraron horarios para este día.'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al consultar disponibilidad.'
      });
    } finally {
      setCargandoHorarios(false);
    }
  };




  const agendarCita = async () => {
    if (!idMedico || !fecha || !idHorario) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completá todos los campos antes de agendar la cita.',
      });
      return;
    }
  
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const idUsuario = usuario?.iD_USUARIO || null;
  
    if (!idUsuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Usuario no identificado',
        text: 'Iniciá sesión nuevamente para agendar la cita.',
      });
      return;
    }
  
    const dia = fecha.getDate();
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();
  
    const cita = {
      id_MEDICO: idMedico,
      iD_USUARIO: idUsuario,
      id_HORARIO: idHorario,
      TIPO_CITA: "Presencial",
      dia,
      mes,
      anio
    };
  
    setEnviando(true); // ⏳ comienza proceso
  
    try {
      const res = await fetch("https://apiclinicasalud.azurewebsites.net/api/cita/agendar", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cita)
      });
  
      const result = await res.json();
  
      if (result.code === 0) {
        Swal.fire({
          icon: 'success',
          title: 'Cita agendada',
          text: result.message,
        });
  
        // Enviar correo después de agendar
        await enviarCorreoCita();
  
        // Resetear formulario
        setIdEspecialidad(0);
        setIdMedico(0);
        setFecha(null);
        setIdHorario(0);
        setHorarios([]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No se pudo agendar',
          text: result.message,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Hubo un problema al conectar con el servidor. Intentá de nuevo.',
      });
    } finally {
      setEnviando(false); // ✅ finaliza proceso
    }
  };
  

  const enviarCorreoCita = async () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const correo = usuario?.email || null;
  
    if (!correo || !fecha || !idHorario) return;
  
    const fechaStr = `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1)
      .toString().padStart(2, '0')}/${fecha.getFullYear()}`;
  
    const horario = horarios.find(h => h.id_HORARIO === idHorario);
  
    const mensajePlano = `Hola, te confirmamos que tu cita fue agendada con éxito. Fecha: ${fechaStr} Horario: ${horario?.hora_INICIO} - ${horario?.hora_FIN}. Tipo: Presencial. Gracias por confiar en Clínica Salud Integral.`;
  
    const contenidoHtml = `
      <h2>Confirmación de Cita Médica</h2>
      <p>Hola, te confirmamos que tu cita fue agendada con éxito.</p>
      <p><strong>Fecha:</strong> ${fechaStr}</p>
      <p><strong>Horario:</strong> ${horario?.hora_INICIO} - ${horario?.hora_FIN}</p>
      <p><strong>Tipo:</strong> Presencial</p>
      <p>Gracias por confiar en Clínica Salud Integral.</p>
    `;
  
    const emailData = {
      to: correo,
      subject: "Confirmación de tu cita médica",
      htmlContent: contenidoHtml,
    };
  
    try {
      const response = await fetch("https://apiclinicasalud.azurewebsites.net/api/notificacion/enviar-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error("Error al enviar correo:", result.message);
        return;
      }
  
      const historialData = {
        email: correo,
        mensaje: mensajePlano,
        iD_TIPO_NOTIFICACION: 2 //ID para correo de confirmación 
      };
  
      const historialRes = await fetch("https://apiclinicasalud.azurewebsites.net/api/historialnotificacion/insertar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(historialData),
      });
  
      const historialResult = await historialRes.json();
  
      if (historialRes.ok) {
        console.log("Historial registrado correctamente");
      } else {
        console.error("Error al registrar historial:", historialResult.message);
      }
  
    } catch (error) {
      console.error("Fallo el envío del correo o el historial", error);
    }
  };
  
  
  


  return (
    <>
      <HeaderPacient />

      <div className="flex justify-center items-start min-h-screen pt-8 bg-gray-100 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
          <button
            onClick={() => navigate('/dashboard/paciente')} // Ruta a la que deseás volver
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center cursor-pointer"
          >
            Volver
          </button>
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-1">Agendá tu cita</h2>
          <p className="text-center text-gray-500 mb-6">Seleccioná la especialidad, médico y fecha para continuar.</p>

          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Especialidad</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={idEspecialidad}
                onChange={(e) => {
                  setIdEspecialidad(Number(e.target.value));
                  setIdMedico(0);
                  setHorarios([]);
                  setIdHorario(0);
                }}
              >
                <option value="0">Seleccioná una especialidad</option>
                {especialidades.map((esp) => (
                  <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Médico</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={idMedico}
                onChange={(e) => {
                  setIdMedico(Number(e.target.value));
                  setHorarios([]);
                  setIdHorario(0);
                }}
              >
                <option value="0">Seleccioná un médico</option>
                {medicos.map((m) => (
                  <option key={m.id} value={m.id}>{m.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Fecha</label>
              <div className="flex flex-col sm:gap-2 md:grid md:grid-flow-col md:gap-4">
                <DatePicker
                  selected={fecha}
                  onChange={(date: Date | null) => setFecha(date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  minDate={new Date()}
                  placeholderText="Seleccioná una fecha"
                />
                <button
                  onClick={obtenerHorarios}
                  className="mt-2 sm:mt-0 bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition cursor-pointer"
                >
                  Consultar Horarios
                </button>
              </div>
            </div>

            {cargandoHorarios && <p className="text-gray-500 text-sm">Cargando horarios disponibles...</p>}

            {horarios.length > 0 && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">Horarios Disponibles</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={idHorario}
                  onChange={(e) => setIdHorario(Number(e.target.value))}
                >
                  <option value="0">Seleccioná un horario</option>
                  {horarios.map((h) => (
                    <option key={h.id_HORARIO} value={h.id_HORARIO}>
                      {h.hora_INICIO} - {h.hora_FIN}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {idHorario !== 0 && (
              <button
              onClick={agendarCita}
              disabled={enviando}
              className={`w-full text-white font-semibold py-3 rounded-lg transition cursor-pointer 
                ${enviando ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {enviando ? (
                <span className="flex justify-center items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Agendando...
                </span>
              ) : (
                'Agendar Cita'
              )}
            </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
};

export default ScheduleAppointment;
