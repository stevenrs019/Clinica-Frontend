// src/components/ContactSection.tsx

import React from 'react';

const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Contáctenos</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Información de contacto</h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <h4 className="font-semibold">Dirección</h4>
                  <p>Avenida 10, Ciudad Médica</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <h4 className="font-semibold">Teléfono</h4>
                  <p>+506 2222 3333</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p>info@saludintegral.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="text-2xl">🕒</div>
                <div>
                  <h4 className="font-semibold">Horario</h4>
                  <p>Lunes a Viernes: 8:00 AM - 8:00 PM</p>
                  <p>Sábados: 8:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-700">Envíenos un mensaje</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nombre completo"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Correo electrónico"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccione especialidad</option>
                <option value="medicina-general">Medicina General</option>
                <option value="cardiologia">Cardiología</option>
                <option value="pediatria">Pediatría</option>
                <option value="ginecologia">Ginecología</option>
                <option value="traumatologia">Traumatología</option>
              </select>
              <textarea
                rows={5}
                placeholder="Mensaje"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
