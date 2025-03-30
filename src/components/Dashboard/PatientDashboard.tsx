// src/components/PatientDashboard.tsx
import { useNavigate } from 'react-router-dom';

const PatientDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('usuario'); // Limpiar datos
        navigate('/'); // Redirigir a landing
    };

    const options = [
        {
            label: 'Agendar cita',
            icon: '📅', // o usás un ícono SVG o imagen
            action: () => navigate('/agendar-cita')
        },
        {
            label: 'Ver historial',
            icon: '📋',
            action: () => navigate('/historial')
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
            <header className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <div className="text-xl font-bold">MediLink</div>
                <button className="flex items-center space-x-2 cursor-pointer" onClick={handleLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 
              20.25a8.25 8.25 0 0115 0" />
                    </svg>
                    <span>Cerrar sesión</span>
                </button>
            </header>

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
