const Footer = () => {
    return (
      <footer className="bg-gradient-to-r from-blue-500 to-blue-300 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-2">MediLink</h2>
            <p className="text-sm">
              En MediLink, nos comprometemos a ofrecerte un servicio médico de calidad y seguro, con profesionales altamente calificados que garantizan la efectividad de cada tratamiento.
            </p>
          </div>
  
          <div>
            <h3 className="font-semibold mb-2">Ubicación:</h3>
            <p className="text-sm">
              📍 San Pedro los Yoses, 100 metros al oeste de AutoMercado
            </p>
            <h3 className="font-semibold mt-4 mb-2">Contacto:</h3>
            <p className="text-sm">📞 4000-7090 / 4000-7070</p>
            <p className="text-sm">📱 8484-7010</p>
            <p className="text-sm">✉️ info@medilink.com</p>
          </div>
  
          <div>
            <h3 className="font-semibold mb-2">Horario:</h3>
            <p className="text-sm">
              🕒 Lunes a domingo de 08:00 AM a 11:00 PM
            </p>
          </div>
        </div>
  
        <div className="text-center text-sm mt-8">© 2025 MediLink. Todos los derechos reservados.</div>
      </footer>
    );
  };
  
  export default Footer;
  