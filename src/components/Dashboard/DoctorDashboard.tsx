// src/components/Dashboard/DoctorDashboard.tsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPacient from '../HeaderPacient';

const DoctorDashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("usuario");
        if (!user) {
            navigate("/"); // si no está logueado
            return;
        }

    }, [navigate]);

    const options = [
        {
            label: 'Consultas',
            icon: '🩺',
            action: () => navigate('/obtener-citas')
        },
        {
            label: 'Ver historial',
            icon: '📋',
            action: () => navigate('/medico/historial')
        },
        {
            label: 'Telemedicina',
            icon: '📡',
            action: () => navigate('/medico/telemedicina')
        },
        {
            label: 'Perfil',
            icon: '👤',
            action: () => navigate('/medico/perfil')
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <HeaderPacient /> {/* Cambiá si usás HeaderDoctor */}

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

export default DoctorDashboard;
