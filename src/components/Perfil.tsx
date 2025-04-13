// src/components/Perfil.tsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import HeaderPacient from './HeaderPacient'; 
import { useNavigate } from 'react-router-dom';

interface Perfil {
  nombre: string;
  apellidO1: string;
  apellidO2: string;
  edad: string;
  telefono: string;
  fecha_NACIMIENTO: string;
}

const Perfil = () => {
  const [perfil, setPerfil] = useState<Perfil>({
    nombre: '',
    apellidO1: '',
    apellidO2: '',
    edad: '',
    telefono: '',
    fecha_NACIMIENTO: '',
  });

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const navigate = useNavigate();

  const obtenerPerfil = async () => {
    try {
      const res = await fetch(`https://apiclinicasalud.azurewebsites.net/api/perfil/obtener?correo=${usuario.email}`);
      const result = await res.json();

      if (result.code === 0) {
        const data = result.content;
      
        setPerfil({
          nombre: data.nombre,
          apellidO1: data.apellidO1,
          apellidO2: data.apellidO2,
          edad: data.edad,
          telefono: data.telefono,
          fecha_NACIMIENTO: data.fechA_NACIMIENTO?.split('T')[0] || '', // Ajuste aquí
        });
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch {
      Swal.fire("Error", "No se pudo obtener el perfil", "error");
    }
  };

  const actualizarPerfil = async () => {
    try {
      const res = await fetch("https://apiclinicasalud.azurewebsites.net/api/perfil/actualizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...perfil, email: usuario.email }),
      });

      const result = await res.json();
      if (result.code === 0) {
        Swal.fire("Éxito", result.message, "success");
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch {
      Swal.fire("Error", "No se pudo actualizar el perfil", "error");
    }
  };

  useEffect(() => {
    obtenerPerfil();
  }, []);

  return (
    <>
      <HeaderPacient />
      <div className="flex justify-center items-start min-h-screen pt-8 bg-gray-100 px-4">
      <div className="mx-auto mt-10 space-y-4 bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">
      <button
        onClick={() => navigate('/dashboard/paciente')}
        className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-4 flex items-center cursor-pointer"
    >
        Volver
    </button>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4 text-center">Mi Perfil</h2>
        <p className="text-center text-gray-500 mb-6"> <strong>Hola {perfil.nombre}</strong><br/>Esta es tu información actual. Si algo cambió, podés actualizar los campos que necesites.</p>
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Nombre"
          value={perfil.nombre}
          onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Primer Apellido"
          value={perfil.apellidO1}
          onChange={(e) => setPerfil({ ...perfil, apellidO1: e.target.value })}
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Segundo Apellido"
          value={perfil.apellidO2}
          onChange={(e) => setPerfil({ ...perfil, apellidO2: e.target.value })}
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Edad"
          value={perfil.edad}
          onChange={(e) => setPerfil({ ...perfil, edad: e.target.value })}
        />
        <input
          className="w-full border px-4 py-2 rounded"
          placeholder="Teléfono"
          value={perfil.telefono}
          onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
        />
        <input
          type="date"
          className="w-full border px-4 py-2 rounded"
          value={perfil.fecha_NACIMIENTO ? perfil.fecha_NACIMIENTO.split('T')[0] : ''}
          onChange={(e) => setPerfil({ ...perfil, fecha_NACIMIENTO: e.target.value })}
        />

        <button
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 w-full"
          onClick={actualizarPerfil}
        >
          Guardar Cambios
        </button>
      </div>
      </div>
    </>
  );
};

export default Perfil;
