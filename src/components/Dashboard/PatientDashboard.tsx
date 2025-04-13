// src/components/PatientDashboard.tsx
import { useNavigate } from 'react-router-dom';
import HeaderPacient from '../HeaderPacient';

const PatientDashboard = () => {
    const navigate = useNavigate();

    

    const options = [
        {
            label: 'Agendar cita',
            icon: '📅', // o usás un ícono SVG o imagen
            action: () => navigate('/agendar-cita')
        },
        {
            label: 'Ver historial',
            icon: '📋',
            action: () => navigate('/obtener-historial-pacient')
        },
        {
            label: 'Telemedicina',
            icon: '📡',
            action: () => navigate('/telemedicina')
        },
        {
            label: 'Perfil',
            icon: '👤',
            action: () => navigate('/perfil')
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderPacient/>

            <main className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto py-16 px-4">
                {options.map((option, idx) => (
                    <div
                        key={idx}
                        onClick={option.action}
                        className="bg-white p-10 rounded-xl shadow text-center cursor-pointer hover:shadow-lg transition"
                    >
                        <div className="text-5xl mb-4">{option.icon}</div>
                        <div className="text-xl font-semibold text-gray-700">{option.label}</div>
                    </div>
                ))}
            </main>
        </div>
    );
};

export default PatientDashboard;
