import React, { useState } from 'react';
import HeaderPacient from './HeaderPacient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface Historial {
    iD_HISTORIAL: number;
    prescripcion: string;
    diagnostico: string;
    receta: string;
    dia: number;
    mes: number;
    anio: number;
    horA_INICIO: string;
    horA_FIN: string;
    nombrE_MEDICO: string;
}

const GetHistorialForEmail = () => {
    const [correoPaciente, setCorreoPaciente] = useState('');
    const [historial, setHistorial] = useState<Historial[]>([]);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const buscarHistorial = async () => {
        if (!correoPaciente.trim()) {
            Swal.fire("Campos incompletos", "Ingresá el correo del paciente.", "warning");
            return;
        }

        setCargando(true);
        try {
            const res = await fetch(`https://apiclinicasalud.azurewebsites.net/api/HistorialClinico/obtener-hitorial-email?correo=${encodeURIComponent(correoPaciente)}`);
            const result = await res.json();

            if (result.code === 0) {
                setHistorial(result.content);
            } else {
                setHistorial([]);
                Swal.fire("Sin historial", result.message, "info");
            }
        } catch (error) {
            Swal.fire("Error", "No se pudo conectar con el servidor", "error");
        } finally {
            setCargando(false);
        }
    };

    return (
        <>
            <HeaderPacient />
            <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full">
                    <button
                        onClick={() => navigate('/dashboard/doctor')}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center cursor-pointer"
                    >
                        Volver
                    </button>

                    <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Consultar Historial por Correo</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Correo del paciente</label>
                        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                            <input
                                type="email"
                                value={correoPaciente}
                                onChange={(e) => setCorreoPaciente(e.target.value)}
                                placeholder="correo@ejemplo.com"
                                className="w-full border border-gray-300 rounded px-4 py-2"
                            />
                            <button
                                onClick={buscarHistorial}
                                className="mt-3 md:mt-0 text-sm text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
                            >
                                Buscar historial
                            </button>
                        </div>
                    </div>


                    {cargando && <p className="text-center text-gray-500">Cargando historial...</p>}

                    {historial.length > 0 ? (
                        <div className="grid gap-4 mt-4">
                            {historial.map((item) => (
                                <div key={item.iD_HISTORIAL} className="bg-white p-4 rounded-xl shadow-md">
                                    <h3 className="text-lg font-semibold text-gray-700">🩺 {item.nombrE_MEDICO}</h3>
                                    <p className="text-sm text-gray-600">📅 {item.dia}/{item.mes}/{item.anio}</p>
                                    <p className="text-sm text-gray-600">⏰ {item.horA_INICIO} - {item.horA_FIN}</p>
                                    <p className="text-sm mt-2"><strong>Diagnóstico:</strong><br />{item.diagnostico}</p>
                                    <p className="text-sm mt-1"><strong>Prescripción:</strong><br />{item.prescripcion}</p>
                                    <p className="text-sm mt-1"><strong>Receta:</strong><br />{item.receta}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        !cargando && <p className="text-center text-gray-500 mt-8">No hay historial clínico para mostrar.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default GetHistorialForEmail;
