import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

const LoginModal: React.FC<Props> = ({ isOpen, onClose, onSwitchToRegister }) => {
    if (!isOpen) return null;

    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('https://apiclinicasalud.azurewebsites.net/api/usuario/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, contrasena }),
            });

            const result = await response.json();
            console.log(result);

            if (result.code === 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Inicio de sesión exitoso',
                    text: '¡Bienvenido a MediLink!',
                });
                localStorage.setItem("usuario", JSON.stringify(result.content));
                onClose();
                navigate('/dashboard/paciente');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message,
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor.',
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                >
                    &times;
                </button>

                <div className="text-center mb-6">
                    <div className="text-blue-600 text-4xl mb-2 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold">Inicio de Sesión</h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Correo electrónico:</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-md px-4 py-2"
                            placeholder="ejemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Contraseña:</label>
                        <div className="relative">
                            <input
                                type={mostrarContrasena ? "text" : "password"}
                                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10"
                                placeholder="••••••••"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                            >
                                {mostrarContrasena ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.048.168-2.055.476-3.001M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.341A8.962 8.962 0 0121 12c0-4.418-3.582-8-8-8-1.795 0-3.44.593-4.774 1.584M4.222 4.222L19.778 19.778" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold"
                    >
                        Ingresar
                    </button>
                </form>

                <div className="text-sm mt-6 text-center bg-gray-100 p-4 rounded-md">
                    <p className="font-semibold mb-1">¿Aún no tienes una cuenta?</p>
                    <p className="text-gray-600 text-sm">Regístrate ahora y empieza a gestionar tus citas y servicios médicos de manera fácil y rápida.</p>
                    <button
                        onClick={() => {
                            onClose();
                            onSwitchToRegister();
                        }}
                        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
                    >
                        Crear cuenta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
