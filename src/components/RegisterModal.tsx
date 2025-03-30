// src/components/RegisterModal.tsx
import React, { useState } from 'react';
import Swal from 'sweetalert2';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

const RegisterModal: React.FC<Props> = ({ isOpen, onClose, onSwitchToRegister }) => {
    if (!isOpen) return null;
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const [form, setForm] = useState({
        nombre: '',
        apellido1: '',
        apellido2: '',
        edad: '',
        fecha_Nacimiento: '',
        email: '',
        telefono: '',
        contrasena: '',
        confirmar: '',
        aceptaPolitica: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.contrasena !== form.confirmar) {
            return Swal.fire({
                icon: 'warning',
                title: 'Las contraseñas no coinciden',
            });
        }

        if (!form.aceptaPolitica) {
            return Swal.fire({
                icon: 'warning',
                title: 'Debe aceptar la política de privacidad.',
            });
        }

        try {
            const { aceptaPolitica, confirmar, ...payload } = form;
            const res = await fetch('https://apiclinicasalud.azurewebsites.net/api/usuario/insertar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...payload,
                    id_Rol: 2 // ID que corresponda a "Paciente"
                })
            });

            const result = await res.json();
            if (result.code === 0) {
                Swal.fire({
                    icon: 'success',
                    title: '¡Cuenta creada!',
                    text: 'Tu cuenta ha sido registrada correctamente.',
                });
                onClose();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al registrar',
                    text: result.message,
                });
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error de red',
                text: 'No se pudo conectar con el servidor.',
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center overflow-auto">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-8 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer">
                    &times;
                </button>

                <div className="text-center mb-6">
                    <div className="text-blue-600 text-4xl mb-2 flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="w-8 h-8" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold">Queremos conocerte mejor</h2>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="nombre" value={form.nombre} onChange={handleChange} required className="border rounded-md px-4 py-2" placeholder="Nombre" />
                        <input name="apellido1" value={form.apellido1} onChange={handleChange} required className="border rounded-md px-4 py-2" placeholder="Apellido 1" />
                        <input name="apellido2" value={form.apellido2} onChange={handleChange} className="border rounded-md px-4 py-2" placeholder="Apellido 2" />
                        <input name="edad" type="number" value={form.edad} onChange={handleChange} required className="border rounded-md px-4 py-2" placeholder="Edad" />
                        <input name="fecha_Nacimiento" type="date" value={form.fecha_Nacimiento} onChange={handleChange} required className="border rounded-md px-4 py-2 md:col-span-2" placeholder="Fecha de nacimiento" />
                    </div>
                    <input name="telefono" value={form.telefono} onChange={handleChange} type="telephone" required className="w-full border rounded-md px-4 py-2" placeholder="Número Telefónico" />
                    <input name="email" value={form.email} onChange={handleChange} type="email" required className="w-full border rounded-md px-4 py-2" placeholder="Correo electrónico" />
                    <div className='relative'>
                        <input name="contrasena" value={form.contrasena} onChange={handleChange} type={mostrarContrasena ? "text" : "password"} required className="w-full border rounded-md px-4 py-2" placeholder="Contraseña" />
                        <button
                            type="button"
                            onClick={() => setMostrarContrasena(!mostrarContrasena)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
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
                    <div className='relative'>
                    <input name="confirmar" value={form.confirmar} onChange={handleChange} type={mostrarContrasena ? "text" : "password"} required className="w-full border rounded-md px-4 py-2" placeholder="Confirmar contraseña" />
                        <button
                            type="button"
                            onClick={() => setMostrarContrasena(!mostrarContrasena)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
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
                    

                    <label className="flex items-center text-sm">
                        <input type="checkbox" name="aceptaPolitica" checked={form.aceptaPolitica} onChange={handleChange} className="mr-2" />
                        He leído y acepto la <a href="#" className="text-blue-600 underline"> política de privacidad y protección de datos</a>.
                    </label>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full font-semibold">
                        Crear cuenta
                    </button>
                </form>

                <div className="text-sm mt-6 text-center bg-gray-100 p-4 rounded-md">
                    <p className="font-semibold mb-1">¿Ya tienes una cuenta?</p>
                    <p className="text-gray-600 text-sm">Inicia sesión ahora y empieza a gestionar tus citas y servicios médicos de manera fácil y rápida.</p>
                    <button onClick={() => {
                        onClose();
                        onSwitchToRegister();
                    }} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterModal;
