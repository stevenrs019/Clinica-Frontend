import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderPacient from './HeaderPacient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AppointmentModal from './AppointmentModal';


interface Cita {
    iD_CITA: number;
    nombrE_PACIENTE: string;
    emaiL_PACIENTE: string;
    horA_INICIO: string;
    horA_FIN: string;
    estado: string;
    tipO_CITA: string;
}

const GetAppointment = () => {
    const [fecha, setFecha] = useState<Date | null>(null);
    const [citas, setCitas] = useState<Cita[]>([]);
    const [cargando] = useState(false);
    const navigate = useNavigate();
    const [citaSeleccionada, setCitaSeleccionada] = useState<Cita | null>(null);



    const consultarCitas = async () => {
        if (!fecha) {
            Swal.fire("Seleccioná una fecha", "", "warning");
            return;
        }

        const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
        const idUsuario = usuario.iD_USUARIO;

        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();

        try {
            const res = await fetch(`https://apiclinicasalud.azurewebsites.net/api/Cita/citas-dia?idUsuario=${idUsuario}&dia=${dia}&mes=${mes}&anio=${anio}`);
            const result = await res.json();

            if (result.code === 0) {
                setCitas(result.content);
            } else {
                setCitas([]);
                Swal.fire("Sin citas", result.message, "info");
            }
        } catch (error) {
            Swal.fire("Error", "No se pudieron consultar las citas", "error");
        }
    };

    return (
        <>
            <HeaderPacient />
            <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
                    <button
                        onClick={() => navigate('/dashboard/doctor')} // Ruta a la que deseás volver
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center cursor-pointer"
                    >
                        Volver
                    </button>
                    <div className="text-center text-4xl">
                        <span role="img" aria-label="icon">🩺</span>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-blue-800 mb-1">Consultas</h2>
                    <p className="text-center text-gray-500 mb-6">Seleccioná la fecha para continuar</p>
                    <div className="flex items-center justify-between mb-6">


                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Fecha</label>
                        <div className="flex flex-col sm:gap-2 md:grid md:grid-flow-col md:gap-4">
                            <DatePicker
                                selected={fecha}
                                onChange={(date) => setFecha(date)}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                placeholderText="Seleccioná una fecha"
                                dateFormat="dd/MM/yyyy"
                            />
                            <button
                                className="text-sm mt-5 md:mt-0 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                                onClick={consultarCitas}
                            >
                                Consultar citas
                            </button>
                        </div>
                    </div>

                    {cargando && <p className="text-center text-gray-500">Cargando citas...</p>}

                    {citas.length > 0 ? (
                        <div className="grid gap-4 mt-4">
                            {citas.map((cita) => (
                                <div key={cita.iD_CITA} onClick={() => setCitaSeleccionada(cita)} className="bg-white p-4 rounded-xl shadow-md cursor-pointer">
                                    <h3 className="text-lg font-semibold text-gray-700">{cita.nombrE_PACIENTE}</h3>
                                    <p className="text-sm text-gray-600">
                                        ⏰ {cita.horA_INICIO} - {cita.horA_FIN}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {cita.tipO_CITA}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {cita.tipO_CITA}
                                    </p>
                                    <p className="text-sm text-[#e80f26] font-medium mt-1">{cita.estado}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 mt-8">No hay citas para mostrar.</p>
                    )}
                </div>
            </div>
            <AppointmentModal
                isOpen={!!citaSeleccionada}
                onClose={() => setCitaSeleccionada(null)}
                cita={citaSeleccionada}
                onHistorialGuardado={consultarCitas}
            />
        </>
    );



};

export default GetAppointment;
