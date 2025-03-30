const ContactQuickActions = () => {
    const actions = [
      {
        label: (
          <>
            Llamanos a nuestro número <br /> telefónico
          </>
        ),
        button: 'Llamar',
        bg: 'bg-[#117EE8]',
        textcolor: 'text-[#FFFFFF]',
      },
      {
        label: (
          <>
            Conversá con nosotros vía <br /> WhatsApp
          </>
          ),
        button: 'Enviar mensaje',
        bg: 'bg-[#2BB2E3]',
        textcolor: 'text-[#FFFFFF]',
      },
      {
        label: (
          <>
            Contáctanos vía correo <br /> electrónico
          </>
        ),
        button: 'Enviar correo',
        bg: 'bg-[#ABE7FF]',
        textcolor: 'text-[#6C6C6C]',
      },
    ];
  
    return (
      <section className="grid grid-cols-1 md:grid-cols-3 max-w-1xl  md:h-60">
        {actions.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col justify-center items-center text-center p-6  shadow-sm ${item.bg}`}
          >
            <p className={`mb-4 font-medium text-lg ${item.textcolor}`}>{item.label}</p>
            <button className="bg-white text-blue-600 font-semibold py-2 px-8 rounded-full shadow hover:bg-gray-100">
              {item.button}
            </button>
          </div>
        ))}
      </section>
    );
    
  };
  
  export default ContactQuickActions;