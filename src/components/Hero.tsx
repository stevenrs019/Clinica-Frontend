import BgHero from '../assets/img/Bg-Hero.webp'
const Hero = () => {
    return (
      <section className="bg-gradient-to-r from-blue-500 to-blue-300 text-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/">
            <h2 className="text-5xl font-bold mb-4 pt-15 md:pt-0">Tu salud es <br/> nuestra prioridad</h2>
            <p className="mb-6">
              Contamos con un equipo de expertos listos para atenderte en cada etapa de tu salud.
              ¡Agendá tu cita hoy mismo!
            </p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-100">
              Agenda tu cita
            </button>
          </div>
          <div className="md:w-1/ mt-8 md:mt-0">
            <img
              src={BgHero}
              alt="Doctores"
              className="w-[1000px] mx-auto "
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;