// src/components/Doctor/CitaModal.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cita: {
    iD_CITA: number;
    nombrE_PACIENTE: string;
    horA_INICIO: string;
    horA_FIN: string;
  } | null;
}

const AppointmentModal: React.FC<Props> = ({ isOpen, onClose, cita }) => {
  const [prescripcion, setPrescripcion] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [receta, setReceta] = useState('');

  if (!isOpen || !cita) return null;

  const handleGuardar = () => {
    // Aquí podrías hacer el fetch para guardar la información
    Swal.fire("Guardado", "La información de la consulta fue guardada correctamente", "success");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-blue-800">Detalles de la Cita</h2>
        <p className="text-sm text-gray-600 mb-2">
          <strong>Paciente:</strong> {cita.nombrE_PACIENTE}
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
          />
          <textarea
            placeholder="Prescripción"
            className="w-full border p-2 rounded"
            rows={2}
            value={prescripcion}
            onChange={(e) => setPrescripcion(e.target.value)}
          />
          <textarea
            placeholder="Receta"
            className="w-full border p-2 rounded"
            rows={2}
            value={receta}
            onChange={(e) => setReceta(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleGuardar}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
