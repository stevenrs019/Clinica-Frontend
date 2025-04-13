import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cita: {
    iD_CITA: number;
    nombrE_PACIENTE: string;
    emaiL_PACIENTE: string;
    horA_INICIO: string;
    horA_FIN: string;
  } | null;
  onHistorialGuardado: () => void;
}

const AppointmentModal: React.FC<Props> = ({ isOpen, onClose, cita, onHistorialGuardado }) => {
  const [prescripcion, setPrescripcion] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [receta, setReceta] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen || !cita) return null;

  const handleGuardar = async () => {
    if (!prescripcion || !diagnostico || !receta) {
      Swal.fire("Campos incompletos", "Por favor completá todos los campos.", "warning");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://apiclinicasalud.azurewebsites.net/api/HistorialClinico/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idCita: cita.iD_CITA,
          prescripcion,
          diagnostico,
          receta
        })
      });

      const data = await response.json();

      if (data.code === 0) {
        Swal.fire("Guardado", "La información de la consulta fue guardada correctamente", "success");
        await enviarRecetaPorCorreo();
        setPrescripcion('');
        setDiagnostico('');
        setReceta('');
        onClose();
        onHistorialGuardado();
      } else {
        Swal.fire("Error", data.message || "Ocurrió un error al guardar el historial.", "error");
      }

    } catch (error: any) {
      console.error("Error al guardar:", error);
      Swal.fire("Error", "No se pudo conectar con el servidor.", "error");
    } finally {
      setLoading(false);
    }
  };

  const enviarRecetaPorCorreo = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
      const nombreMedico = `${usuario.nombre} ${usuario.apellidO1} ${usuario.apellidO2}`;
      const body = {
        email: cita.emaiL_PACIENTE,
        nombrePaciente: cita.nombrE_PACIENTE,
        diagnostico,
        receta,
        nombreMedico
      };

      const res = await fetch("https://apiclinicasalud.azurewebsites.net/api/notificacion/enviar-receta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error al enviar receta:", data.message);
      }
    } catch (error) {
      console.error("No se pudo enviar la receta:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 z-50 flex items-center justify-center rounded-xl">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
          disabled={loading}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-800">Detalles de la Cita</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Paciente:</strong> {cita.nombrE_PACIENTE}
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Correo paciente:</strong> {cita.emaiL_PACIENTE}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Horario:</strong> {cita.horA_INICIO} - {cita.horA_FIN}
        </p>

        <div className="space-y-4">
          <textarea
            placeholder="Diagnóstico"
            className="w-full border p-2 rounded"
            rows={2}
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            disabled={loading}
          />
          <textarea
            placeholder="Prescripción"
            className="w-full border p-2 rounded"
            rows={2}
            value={prescripcion}
            onChange={(e) => setPrescripcion(e.target.value)}
            disabled={loading}
          />
          <textarea
            placeholder="Receta"
            className="w-full border p-2 rounded"
            rows={2}
            value={receta}
            onChange={(e) => setReceta(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGuardar}
            disabled={loading}
            className={`bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
