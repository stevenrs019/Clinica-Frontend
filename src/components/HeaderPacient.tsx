import { useNavigate } from 'react-router-dom';

const HeaderPacient = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('usuario'); // Limpiar datos
        navigate('/'); // Redirigir a landing
    };
  return (
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
  );
};

export default HeaderPacient;
